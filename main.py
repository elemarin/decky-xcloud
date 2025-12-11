import subprocess
import os
import logging

# Setup logging
logging.basicConfig(
    filename="/tmp/decky-xcloud.log",
    format='[%(asctime)s] %(levelname)s: %(message)s',
    level=logging.INFO
)

class Plugin:
    async def check_edge_installed(self) -> bool:
        """Check if Microsoft Edge is installed via Flatpak"""
        try:
            result = subprocess.run(
                ["flatpak", "list", "--app"],
                capture_output=True,
                text=True,
                timeout=10
            )
            logging.info(f"Flatpak list result: {result.stdout}")
            return "com.microsoft.Edge" in result.stdout
        except Exception as e:
            logging.error(f"Error checking Edge installation: {e}")
            return False

    async def install_edge(self) -> dict:
        """Install Microsoft Edge via Flatpak"""
        try:
            logging.info("Starting Edge installation...")
            
            # Add Flathub repository if not already added
            subprocess.run(
                ["flatpak", "remote-add", "--if-not-exists", "flathub", 
                 "https://flathub.org/repo/flathub.flatpakrepo"],
                capture_output=True,
                text=True,
                timeout=30
            )
            
            # Install Microsoft Edge
            result = subprocess.run(
                ["flatpak", "install", "-y", "flathub", "com.microsoft.Edge"],
                capture_output=True,
                text=True,
                timeout=300
            )
            
            if result.returncode == 0:
                logging.info("Edge installed successfully")
                return {"success": True, "message": "Microsoft Edge installed successfully"}
            else:
                logging.error(f"Edge installation failed: {result.stderr}")
                return {"success": False, "message": f"Installation failed: {result.stderr}"}
                
        except subprocess.TimeoutExpired:
            logging.error("Edge installation timed out")
            return {"success": False, "message": "Installation timed out"}
        except Exception as e:
            logging.error(f"Error installing Edge: {e}")
            return {"success": False, "message": f"Error: {str(e)}"}

    async def create_shortcut(self) -> dict:
        """Create Xbox Cloud Gaming shortcut in Steam"""
        try:
            logging.info("Creating Xbox Cloud Gaming shortcut...")
            
            # Check if Edge is installed first
            edge_installed = await self.check_edge_installed()
            if not edge_installed:
                return {"success": False, "message": "Microsoft Edge is not installed"}
            
            # Steam shortcuts directory
            shortcuts_dir = os.path.expanduser("~/.local/share/Steam/userdata")
            
            # Check if Steam directory exists
            if not os.path.exists(shortcuts_dir):
                logging.error(f"Steam directory not found: {shortcuts_dir}")
                return {"success": False, "message": "Steam directory not found"}
            
            # Find the user ID directory (usually there's only one)
            user_dirs = [d for d in os.listdir(shortcuts_dir) if os.path.isdir(os.path.join(shortcuts_dir, d)) and d.isdigit()]
            
            if not user_dirs:
                logging.error("No Steam user directory found")
                return {"success": False, "message": "No Steam user directory found"}
            
            user_id = user_dirs[0]  # Use the first user directory
            config_dir = os.path.join(shortcuts_dir, user_id, "config")
            
            # Create config directory if it doesn't exist
            os.makedirs(config_dir, exist_ok=True)
            
            # Xbox Cloud Gaming URL
            xcloud_url = "https://www.xbox.com/play"
            
            # Flatpak command to launch Edge with proper permissions
            # Based on Microsoft's official guide
            launch_command = (
                "flatpak run --command=/app/bin/microsoft-edge "
                "--filesystem=xdg-run/pipewire-0 "
                "--device=all "
                "com.microsoft.Edge "
                f"--window-size=1024,640 --force-device-scale-factor=1.25 "
                f"--device-scale-factor=1.25 --kiosk '{xcloud_url}'"
            )
            
            # Create a desktop file for the shortcut
            desktop_file_path = os.path.expanduser("~/.local/share/applications/xcloud-gaming.desktop")
            desktop_file_content = f"""[Desktop Entry]
Name=Xbox Cloud Gaming
Comment=Play Xbox games via cloud gaming
Exec={launch_command}
Icon=com.microsoft.Edge
Terminal=false
Type=Application
Categories=Game;
"""
            
            with open(desktop_file_path, 'w') as f:
                f.write(desktop_file_content)
            
            # Make the desktop file executable
            os.chmod(desktop_file_path, 0o755)
            
            logging.info(f"Created desktop file: {desktop_file_path}")
            
            # Add to Steam as non-Steam game
            # Note: This requires manual addition or using a tool like steam-rom-manager
            # For now, we'll just create the desktop file which can be added manually
            
            return {
                "success": True, 
                "message": "Xbox Cloud Gaming shortcut created. You can now add it to Steam via 'Add Non-Steam Game'.",
                "desktop_file": desktop_file_path,
                "launch_command": launch_command
            }
            
        except Exception as e:
            logging.error(f"Error creating shortcut: {e}")
            return {"success": False, "message": f"Error: {str(e)}"}

    async def get_status(self) -> dict:
        """Get the current status of Edge installation and shortcut"""
        try:
            edge_installed = await self.check_edge_installed()
            desktop_file_exists = os.path.exists(os.path.expanduser("~/.local/share/applications/xcloud-gaming.desktop"))
            
            return {
                "edge_installed": edge_installed,
                "shortcut_created": desktop_file_exists
            }
        except Exception as e:
            logging.error(f"Error getting status: {e}")
            return {
                "edge_installed": False,
                "shortcut_created": False,
                "error": str(e)
            }

    async def launch_xcloud(self) -> dict:
        """Launch Xbox Cloud Gaming directly"""
        try:
            logging.info("Launching Xbox Cloud Gaming...")
            
            edge_installed = await self.check_edge_installed()
            if not edge_installed:
                return {"success": False, "message": "Microsoft Edge is not installed"}
            
            xcloud_url = "https://www.xbox.com/play"
            
            # Launch Edge with proper permissions
            subprocess.Popen(
                [
                    "flatpak", "run",
                    "--command=/app/bin/microsoft-edge",
                    "--filesystem=xdg-run/pipewire-0",
                    "--device=all",
                    "com.microsoft.Edge",
                    "--window-size=1024,640",
                    "--force-device-scale-factor=1.25",
                    "--device-scale-factor=1.25",
                    "--kiosk", xcloud_url
                ],
                stdout=subprocess.DEVNULL,
                stderr=subprocess.DEVNULL
            )
            
            logging.info("Xbox Cloud Gaming launched successfully")
            return {"success": True, "message": "Xbox Cloud Gaming launched"}
            
        except Exception as e:
            logging.error(f"Error launching Xbox Cloud Gaming: {e}")
            return {"success": False, "message": f"Error: {str(e)}"}

    # Decky plugin lifecycle methods
    async def _main(self):
        logging.info("Xbox Cloud Gaming plugin loaded")

    async def _unload(self):
        logging.info("Xbox Cloud Gaming plugin unloaded")
