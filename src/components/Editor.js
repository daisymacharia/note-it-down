import React, { useEffect, useState } from "react";
import {
  convertFromRaw,
  convertToRaw,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import "draft-js/dist/Draft.css";
import styled from "styled-components";
import createHighlightPlugin from "./plugins/highlightPlugin";
import basicTextStylePlugin from "./plugins/textStylePlugins";
import basicBlockStylePlugin from "./plugins/blockStylePlugins";
import {
  AiOutlineUnorderedList,
  AiOutlineOrderedList,
  AiFillDelete,
} from "react-icons/ai";
import { GrBlockQuote } from "react-icons/gr";
import { blockTypeButtons, inlineStyleButtons } from "../fixtures";
import { Button, Multiselect } from "./";

const icons = { AiOutlineUnorderedList, AiOutlineOrderedList, GrBlockQuote };
const highlightPlugin = createHighlightPlugin();

const EditorContainer = styled.div`
  height: 100%;
  color: #2c3a51;
  text-align: left;
  overflow-y: hidden;
  overflow-x: hidden;
  width: 100%;

  .submitNote {
    position: absolute;
    border-radius: 4px;
    font-size: 13px;
    padding: 0.5rem;
    color: white;
    border: none;
    background-color: #4563eb;
    margin: 0.35em 0 0.35rem 0.35rem;
    right: 1rem;
  }

  input[type="text"].noteTitle {
    font-size: 2.5rem;
    line-height: 0.5rem;
    height: 3rem;
    letter-spacing: 0.7px;
    border: none;
    width: 80%;
    color: #4563eb;
    background-color: transparent;
    text-overflow: ellipsis;
    padding: 0.5rem;
    margin-bottom: 2rem;
    outline: none;
  }

  .organization {
    height: 3rem;
    font-size: 1.5rem;
    border: none;
    background-color: transparent;
    outline: none;
  }

  .wrapper {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #dedcdc;
  margin-bottom: 1rem;
  padding: 0.5em;
  border-radius: 4px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

  svg {
    border: 1px solid #eee;
    background-color: #fff;
    border-radius: 5px;
    cursor: pointer;
    margin-right: 1rem;
    font-size: 1.3rem;
  }

  svg.active {
    background-color: #4563eb;
    border-color: transparent;
  }
`;

const AbsoluteButtons = styled.div`
  display: flex;
  position: absolute;
  right: 1rem;
  align-items: center;

  svg {
    font-size: 1.5rem;
    fill: #4563eb;
    margin-right: 1rem;
  }
`;

const StyledButtons = styled.input.attrs({ type: "button" })`
  border: 1px solid #eee;
  background-color: ${(props) => (props.active ? "#4563eb" : "#fff")};
  border-radius: 5px;
  cursor: pointer;
  margin-right: 1rem;
  text-decoration: ${(props) => props.styleType};
  font-weight: ${(props) => (props.styleType === "bold" ? 900 : "unset")};

  &:hover {
    background-color: ${(props) => (props.active ? "none" : "#eee")};
  }
`;

const StyledEditor = styled.div`
  height: calc(100% - 6rem);
  width: 100%;
  overflow: scroll;
`;

const CustomEditor = (props) => {
  const styleMap = {
    HIGHLIGHT: {
      backgroundColor: "#faed27",
    },
  };

  let plugins = [basicBlockStylePlugin, highlightPlugin, basicTextStylePlugin];

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    let displayedNote = props.displayedNote;
    if (typeof displayedNote == "object") {
      let rawContentFromFile = displayedNote;
      let persistedTitle = displayedNote.title;
      let persistedOrganization = displayedNote.organization;
      let persistedParticipants = displayedNote.participants;
      setTitle(persistedTitle);
      setOrganization(persistedOrganization);
      setParticipants(persistedParticipants);
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(rawContentFromFile.body))
        )
      );
    } else {
      setTitle("");
      setOrganization("");
      setParticipants([]);
      setEditorState(EditorState.createEmpty());
    }
  }, [props.displayedNote]);

  const captureTitle = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setTitle(value);
  };

  const captureOrganization = (event) => {
    event.preventDefault();
    let value = event.target.value;
    setOrganization(value);
  };

  const onSelectParticipant = (selectedItem) => {
    setParticipants(selectedItem);
  };

  const onRemoveParticipant = (selectedItem) => {
    let selectedList = participants.filter(
      (element) => element.key === selectedItem.key
    );
    setParticipants(selectedItem);
  };

  const toggleInlineStyle = (event) => {
    event.preventDefault();
    let style = event.currentTarget.getAttribute("data-style");
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const toggleBlockType = (event) => {
    event.preventDefault();

    let block = event.currentTarget.getAttribute("data-block");
    setEditorState(RichUtils.toggleBlockType(editorState, block));
  };

  const handleKeyCommand = (command) => {
    // inline formatting key commands handles bold, italic, code, underline
    let EditorState = RichUtils.handleKeyCommand(editorState, command);
    if (!EditorState && command === "strikethrough") {
      EditorState = RichUtils.toggleInlineStyle(editorState, "STRIKETHROUGH");
    }
    if (!EditorState && command === "highlight") {
      EditorState = RichUtils.toggleInlineStyle(editorState, "HIGHLIGHT");
    }

    if (EditorState) {
      setEditorState(EditorState);
      return "handled";
    }

    return "not-handled";
  };

  const keyBindingFunction = (event) => {
    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "h"
    ) {
      return "highlight";
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "x"
    ) {
      return "strikethrough";
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "7"
    ) {
      return "ordered-list";
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "8"
    ) {
      return "unordered-list";
    }

    if (
      KeyBindingUtil.hasCommandModifier(event) &&
      event.shiftKey &&
      event.key === "9"
    ) {
      return "blockquote";
    }

    return getDefaultKeyBinding(event);
  };

  const renderInlineStyleButton = (value, style, styleType) => {
    const currentInlineStyle = editorState.getCurrentInlineStyle();

    return (
      <StyledButtons
        type="button"
        key={style}
        active={currentInlineStyle.has(style)}
        styleType={styleType}
        value={value}
        data-style={style}
        onMouseDown={toggleInlineStyle}
      />
    );
  };

  const renderBlockButton = (value, block) => {
    const currentBlockType = RichUtils.getCurrentBlockType(editorState);

    if (value in icons) {
      let Icon = icons[value];
      return (
        <Icon key={block} data-block={block} onMouseDown={toggleBlockType} />
      );
    }

    return (
      <StyledButtons
        type="button"
        key={block}
        active={currentBlockType === block}
        value={value}
        data-block={block}
        onMouseDown={toggleBlockType}
      />
    );
  };

  const submitEditor = async () => {
    let displayedNote = props.displayedNote;
    let contentState = editorState.getCurrentContent();
    let note = {
      title: title,
      participants: participants,
      organization: organization,
      body: convertToRaw(contentState),
    };
    if (
      title === "" ||
      (note.body.blocks.length <= 1 &&
        note.body.blocks[0].depth === 0 &&
        note.body.blocks[0].text === "")
    ) {
      alert("Note cannot be saved if title or body is blank");
    } else {
      note["body"] = JSON.stringify(note.body);
      await setTitle("");
      await setEditorState(EditorState.createEmpty());
      await setOrganization("");
      await setParticipants([]);

      if (displayedNote === "new") {
        props.createNote({
          variables: {
            participants: note.participants,
            organization: note.organization,
            title: note.title,
            body: note.body,
            date: Date.now(),
          },
        });
        // } else {
        //   props.updateNote({
        //     variables: {
        //       _id: displayedNote._id,
        //       participants: note.participants,
        //       organization: note.organization,
        //       title: note.title,
        //       body: note.body,
        //     },
        //   });
      }
    }
  };

  const deletenote = async () => {
    await props.deleteNote({ variables: { _id: props.displayedNote._id } });
  };

  return (
    <EditorContainer>
      <Toolbar>
        {inlineStyleButtons.map((button) => {
          return renderInlineStyleButton(
            button.value,
            button.style,
            button.styleType
          );
        })}

        {blockTypeButtons.map((button) => {
          return renderBlockButton(button.value, button.block);
        })}
      </Toolbar>
      <AbsoluteButtons>
        {props.displayedNote !== "new" && <AiFillDelete onClick={deletenote} />}
        <Button onClick={submitEditor}>
          {props.displayedNote === "new" ? "Save" : "edit"}
        </Button>
      </AbsoluteButtons>
      <span className="noteTitle">
        <input
          type="text"
          placeholder="Purpose of the meeting"
          name="noteTitle"
          className="noteTitle"
          value={title}
          onChange={captureTitle}
        />
      </span>
      <span className="wrapper">
        <input
          type="text"
          placeholder="Organization name"
          className="organization"
          value={organization}
          onChange={captureOrganization}
        />
        <Multiselect
          onSelect={onSelectParticipant}
          onRemove={onRemoveParticipant}
          selectedValues={participants}
        />
      </span>

      <StyledEditor>
        <Editor
          customStyleMap={styleMap}
          placeholder={"Start taking notes!"}
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCommand={handleKeyCommand}
          keyBindingFn={keyBindingFunction}
          plugins={plugins}
        />
      </StyledEditor>
    </EditorContainer>
  );
};

export default CustomEditor;
