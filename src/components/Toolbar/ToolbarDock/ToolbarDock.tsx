import React from "react";
import { StyledToolbarDock } from "./StyledToolbarDock";
import NoSsr from "../../NoSsr";
import ImportABITool from "../ImportABITool/ImportABITool";
import CallTool from "../CallTool";
import ShareTool from "../ShareTool/ShareTool";
import HistoryTool from "../HistoryTool";

export default function ToolbarDock() {
  return (
    <NoSsr>
      <StyledToolbarDock>
        <CallTool />
        <ImportABITool />
        <ShareTool />
        <HistoryTool />
      </StyledToolbarDock>
    </NoSsr>
  );
}
