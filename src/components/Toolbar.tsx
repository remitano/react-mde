import * as React from "react";
import { Tab } from "../types/Tab";
import { L18n } from "..";
import { classNames, ClassValue } from "../util/ClassNames";
import { ToolbarButtonGroup } from "./ToolbarButtonGroup";
import { ToolbarButton } from "./ToolbarButton";
import { ButtonChildProps } from "../child-props";

export interface ToolbarButtonData {
  commandName: string;
  buttonContent: React.ReactNode;
  buttonProps: any;
  buttonComponentClass: React.ComponentClass | string;
}

export interface ToolbarProps {
  classes?: ClassValue;
  buttons: ToolbarButtonData[][];
  onCommand: (commandName: string) => void;
  onTabChange: (tab: Tab) => void;
  readOnly: boolean;
  disablePreview: boolean;
  tab: Tab;
  l18n: L18n;
  writeButtonProps: ButtonChildProps;
  previewButtonProps: ButtonChildProps;
  buttonProps: ButtonChildProps;
}

export class Toolbar extends React.Component<ToolbarProps> {
  handleTabChange = () => {
    const { onTabChange } = this.props;
    const tab: Tab = this.props.tab === "write" ? "preview" : "write"
    onTabChange(tab);
  };

  render() {
    const { l18n } = this.props;
    const {
      classes,
      children,
      buttons,
      onCommand,
      readOnly,
      disablePreview,
      buttonProps
    } = this.props;
    if ((!buttons || buttons.length === 0) && !children) {
      return null;
    }

    const writePreviewTabs = (
      <div className="mde-tabs">
        <div className="preview-btn-title">{l18n.preview}</div>
        <label className="switch">
          <input type="checkbox" checked={this.props.tab === "preview"} onChange={this.handleTabChange} />
          <span className="slider round"></span>
        </label>
      </div>
    )

    return (
      <div className={classNames("mde-header", classes)}>
        {buttons.map((commandGroup: ToolbarButtonData[], i: number) => (
          <ToolbarButtonGroup key={i} hidden={this.props.tab === "preview"}>
            {i > 0 && <div className="button-group-divider" />}
            {commandGroup.map((c: ToolbarButtonData, j) => {
              return (
                <React.Fragment key={j}>
                  {j > 0 && <div className="button-item-divider" />}
                  <ToolbarButton
                    name={c.commandName}
                    buttonContent={c.buttonContent}
                    buttonProps={{ ...(buttonProps || {}), ...c.buttonProps }}
                    onClick={() => onCommand(c.commandName)}
                    readOnly={readOnly}
                    buttonComponentClass={c.buttonComponentClass}
                  />
                </React.Fragment>
              );
            })}
          </ToolbarButtonGroup>
        ))}
        {!disablePreview && writePreviewTabs}
      </div>
    );
  }
}
