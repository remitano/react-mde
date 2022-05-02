import * as React from "react";
import { Command } from "../command";
import { textHelpers } from "../../helpers/textHelpers";

export const italic: Command = {
  shouldUndo: options => {
    return (
      textHelpers.getCharactersBeforeSelection(options.initialState, 1) ===
        "*" &&
      textHelpers.getCharactersAfterSelection(options.initialState, 1) === "*"
    );
  },
  execute: ({ initialState, textApi }) => {
    // Adjust the selection to encompass the whole word if the caret is inside one
    const newSelectionRange = textHelpers.selectWord({
      text: initialState.text,
      selection: initialState.selection
    });
    const state1 = textApi.setSelectionRange(newSelectionRange);
    // Replaces the current selection with the italic mark up
    const state2 = textApi.replaceSelection(
      `*${textHelpers.getSelectedText(state1)}*`
    );
    // Adjust the selection to not contain the *
    textApi.setSelectionRange({
      start:
        state2.selection.end - 1 - textHelpers.getSelectedText(state1).length,
      end: state2.selection.end - 1
    });
  },
  undo: ({ initialState, textApi }) => {
    const text = textHelpers.getSelectedText(initialState);
    textApi.setSelectionRange({
      start: initialState.selection.start - 1,
      end: initialState.selection.end + 1
    });
    textApi.replaceSelection(text);
    textApi.setSelectionRange({
      start: initialState.selection.start - 1,
      end: initialState.selection.end - 1
    });
  }
};