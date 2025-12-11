var XboxCloudGaming = (function (deckyFrontendLib, React) {
  'use strict';

  var DefaultContext = {
    color: undefined,
    size: undefined,
    className: undefined,
    style: undefined,
    attr: undefined
  };
  var IconContext = React.createContext && /*#__PURE__*/React.createContext(DefaultContext);

  var _excluded = ["attr", "size", "title"];
  function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
  function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } } return target; }
  function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
  function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
  function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), true).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : i + ""; }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  function Tree2Element(tree) {
    return tree && tree.map((node, i) => /*#__PURE__*/React.createElement(node.tag, _objectSpread({
      key: i
    }, node.attr), Tree2Element(node.child)));
  }
  function GenIcon(data) {
    return props => /*#__PURE__*/React.createElement(IconBase, _extends({
      attr: _objectSpread({}, data.attr)
    }, props), Tree2Element(data.child));
  }
  function IconBase(props) {
    var elem = conf => {
      var {
          attr,
          size,
          title
        } = props,
        svgProps = _objectWithoutProperties(props, _excluded);
      var computedSize = size || conf.size || "1em";
      var className;
      if (conf.className) className = conf.className;
      if (props.className) className = (className ? className + " " : "") + props.className;
      return /*#__PURE__*/React.createElement("svg", _extends({
        stroke: "currentColor",
        fill: "currentColor",
        strokeWidth: "0"
      }, conf.attr, attr, svgProps, {
        className: className,
        style: _objectSpread(_objectSpread({
          color: props.color || conf.color
        }, conf.style), props.style),
        height: computedSize,
        width: computedSize,
        xmlns: "http://www.w3.org/2000/svg"
      }), title && /*#__PURE__*/React.createElement("title", null, title), props.children);
    };
    return IconContext !== undefined ? /*#__PURE__*/React.createElement(IconContext.Consumer, null, conf => elem(conf)) : elem(DefaultContext);
  }

  // THIS FILE IS AUTO GENERATED
  function FaGamepad (props) {
    return GenIcon({"attr":{"viewBox":"0 0 640 512"},"child":[{"tag":"path","attr":{"d":"M480.07 96H160a160 160 0 1 0 114.24 272h91.52A160 160 0 1 0 480.07 96zM248 268a12 12 0 0 1-12 12h-52v52a12 12 0 0 1-12 12h-24a12 12 0 0 1-12-12v-52H84a12 12 0 0 1-12-12v-24a12 12 0 0 1 12-12h52v-52a12 12 0 0 1 12-12h24a12 12 0 0 1 12 12v52h52a12 12 0 0 1 12 12zm216 76a40 40 0 1 1 40-40 40 40 0 0 1-40 40zm64-96a40 40 0 1 1 40-40 40 40 0 0 1-40 40z"},"child":[]}]})(props);
  }

  const MESSAGE_CLEAR_TIMEOUT_MS = 3000;
  const Content = ({ serverAPI }) => {
      const [status, setStatus] = React.useState({
          edge_installed: false,
          shortcut_created: false,
      });
      const [loading, setLoading] = React.useState(false);
      const [message, setMessage] = React.useState("");
      React.useEffect(() => {
          refreshStatus();
      }, []);
      const refreshStatus = async () => {
          try {
              const result = await serverAPI.callPluginMethod("get_status", {});
              if (result.success) {
                  setStatus(result.result);
              }
          }
          catch (error) {
              console.error("Error fetching status:", error);
          }
      };
      const handleInstallEdge = async () => {
          setLoading(true);
          setMessage("Installing Microsoft Edge... This may take a few minutes.");
          try {
              const result = await serverAPI.callPluginMethod("install_edge", {});
              if (result.success) {
                  const response = result.result;
                  setMessage(response.message);
                  if (response.success) {
                      await refreshStatus();
                  }
              }
          }
          catch (error) {
              setMessage(`Error: ${error}`);
              console.error("Error installing Edge:", error);
          }
          finally {
              setLoading(false);
          }
      };
      const handleCreateShortcut = async () => {
          setLoading(true);
          setMessage("Creating Xbox Cloud Gaming shortcut...");
          try {
              const result = await serverAPI.callPluginMethod("create_shortcut", {});
              if (result.success) {
                  const response = result.result;
                  setMessage(response.message);
                  if (response.success) {
                      await refreshStatus();
                  }
              }
          }
          catch (error) {
              setMessage(`Error: ${error}`);
              console.error("Error creating shortcut:", error);
          }
          finally {
              setLoading(false);
          }
      };
      const handleLaunchXCloud = async () => {
          setLoading(true);
          setMessage("Launching Xbox Cloud Gaming...");
          try {
              const result = await serverAPI.callPluginMethod("launch_xcloud", {});
              if (result.success) {
                  const response = result.result;
                  setMessage(response.message);
              }
          }
          catch (error) {
              setMessage(`Error: ${error}`);
              console.error("Error launching Xbox Cloud Gaming:", error);
          }
          finally {
              setLoading(false);
              setTimeout(() => setMessage(""), MESSAGE_CLEAR_TIMEOUT_MS);
          }
      };
      return (React.createElement("div", null,
          React.createElement(deckyFrontendLib.PanelSection, { title: "Status" },
              React.createElement(deckyFrontendLib.PanelSectionRow, null,
                  React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: "8px" } },
                      React.createElement("div", null,
                          "Microsoft Edge: ",
                          status.edge_installed ? "✓ Installed" : "✗ Not Installed"),
                      React.createElement("div", null,
                          "Shortcut: ",
                          status.shortcut_created ? "✓ Created" : "✗ Not Created")))),
          React.createElement(deckyFrontendLib.PanelSection, { title: "Setup" },
              !status.edge_installed && (React.createElement(deckyFrontendLib.PanelSectionRow, null,
                  React.createElement(deckyFrontendLib.ButtonItem, { layout: "below", onClick: handleInstallEdge, disabled: loading }, "Install Microsoft Edge"))),
              status.edge_installed && !status.shortcut_created && (React.createElement(deckyFrontendLib.PanelSectionRow, null,
                  React.createElement(deckyFrontendLib.ButtonItem, { layout: "below", onClick: handleCreateShortcut, disabled: loading }, "Create Shortcut"))),
              status.edge_installed && status.shortcut_created && (React.createElement(deckyFrontendLib.PanelSectionRow, null,
                  React.createElement(deckyFrontendLib.ButtonItem, { layout: "below", onClick: handleLaunchXCloud, disabled: loading }, "Launch Xbox Cloud Gaming")))),
          message && (React.createElement(deckyFrontendLib.PanelSection, null,
              React.createElement(deckyFrontendLib.PanelSectionRow, null,
                  React.createElement("div", { style: { fontSize: "12px", color: "#dcdedf" } }, message))))));
  };
  var index = deckyFrontendLib.definePlugin((serverApi) => {
      return {
          title: React.createElement("div", { className: deckyFrontendLib.staticClasses.Title }, "Xbox Cloud Gaming"),
          content: React.createElement(Content, { serverAPI: serverApi }),
          icon: React.createElement(FaGamepad, null),
          onDismount() {
          },
      };
  });

  return index;

})(DFL, SP_REACT);
