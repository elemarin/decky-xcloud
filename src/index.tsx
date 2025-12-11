import {
  ButtonItem,
  definePlugin,
  PanelSection,
  PanelSectionRow,
  Router,
  ServerAPI,
  staticClasses,
} from "decky-frontend-lib";
import { VFC, useState, useEffect } from "react";
import { FaGamepad } from "react-icons/fa";

interface StatusResponse {
  edge_installed: boolean;
  shortcut_created: boolean;
  error?: string;
}

interface ActionResponse {
  success: boolean;
  message: string;
  desktop_file?: string;
  launch_command?: string;
}

const Content: VFC<{ serverAPI: ServerAPI }> = ({ serverAPI }) => {
  const [status, setStatus] = useState<StatusResponse>({
    edge_installed: false,
    shortcut_created: false,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    refreshStatus();
  }, []);

  const refreshStatus = async () => {
    try {
      const result = await serverAPI.callPluginMethod<{}, StatusResponse>(
        "get_status",
        {}
      );
      if (result.success) {
        setStatus(result.result as StatusResponse);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    }
  };

  const handleInstallEdge = async () => {
    setLoading(true);
    setMessage("Installing Microsoft Edge... This may take a few minutes.");
    
    try {
      const result = await serverAPI.callPluginMethod<{}, ActionResponse>(
        "install_edge",
        {}
      );
      
      if (result.success) {
        const response = result.result as ActionResponse;
        setMessage(response.message);
        if (response.success) {
          await refreshStatus();
        }
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      console.error("Error installing Edge:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateShortcut = async () => {
    setLoading(true);
    setMessage("Creating Xbox Cloud Gaming shortcut...");
    
    try {
      const result = await serverAPI.callPluginMethod<{}, ActionResponse>(
        "create_shortcut",
        {}
      );
      
      if (result.success) {
        const response = result.result as ActionResponse;
        setMessage(response.message);
        if (response.success) {
          await refreshStatus();
        }
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      console.error("Error creating shortcut:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLaunchXCloud = async () => {
    setLoading(true);
    setMessage("Launching Xbox Cloud Gaming...");
    
    try {
      const result = await serverAPI.callPluginMethod<{}, ActionResponse>(
        "launch_xcloud",
        {}
      );
      
      if (result.success) {
        const response = result.result as ActionResponse;
        setMessage(response.message);
      }
    } catch (error) {
      setMessage(`Error: ${error}`);
      console.error("Error launching Xbox Cloud Gaming:", error);
    } finally {
      setLoading(false);
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div>
      <PanelSection title="Status">
        <PanelSectionRow>
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            <div>
              Microsoft Edge: {status.edge_installed ? "✓ Installed" : "✗ Not Installed"}
            </div>
            <div>
              Shortcut: {status.shortcut_created ? "✓ Created" : "✗ Not Created"}
            </div>
          </div>
        </PanelSectionRow>
      </PanelSection>

      <PanelSection title="Setup">
        {!status.edge_installed && (
          <PanelSectionRow>
            <ButtonItem
              layout="below"
              onClick={handleInstallEdge}
              disabled={loading}
            >
              Install Microsoft Edge
            </ButtonItem>
          </PanelSectionRow>
        )}

        {status.edge_installed && !status.shortcut_created && (
          <PanelSectionRow>
            <ButtonItem
              layout="below"
              onClick={handleCreateShortcut}
              disabled={loading}
            >
              Create Shortcut
            </ButtonItem>
          </PanelSectionRow>
        )}

        {status.edge_installed && status.shortcut_created && (
          <PanelSectionRow>
            <ButtonItem
              layout="below"
              onClick={handleLaunchXCloud}
              disabled={loading}
            >
              Launch Xbox Cloud Gaming
            </ButtonItem>
          </PanelSectionRow>
        )}
      </PanelSection>

      {message && (
        <PanelSection>
          <PanelSectionRow>
            <div style={{ fontSize: "12px", color: "#dcdedf" }}>
              {message}
            </div>
          </PanelSectionRow>
        </PanelSection>
      )}
    </div>
  );
};

export default definePlugin((serverApi: ServerAPI) => {
  return {
    title: <div className={staticClasses.Title}>Xbox Cloud Gaming</div>,
    content: <Content serverAPI={serverApi} />,
    icon: <FaGamepad />,
    onDismount() {
      // Cleanup if needed
    },
  };
});
