import React, { Component } from 'react';
import EditPane from 'components/editor/EditorPane';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as editorActions from 'store/modules/editor';

class EditorPaneContainer extends Component {
  handleChangeInput = ({ name, value }) => {
    const { EditorActions } = this.props;
    EditorActions.changeInput({ name, value });
  };

  render() {
    const { title, tags, markdown } = this.props;
    const { handleChangeInput } = this;

    return (
      <EditPane title={title} markdown={markdown} tags={tags} onChangeInput={handleChangeInput} />
    );
  }
}

export default connect(
  // mapStateToProps
  state => ({
    title: state.editor.get('title'),
    markdown: state.editor.get('markdown'),
    tags: state.editor.get('tags'),
  }),
  // mapDispatchToProps
  dispatch => ({
    EditorActions: bindActionCreators(editorActions, dispatch),
  }),
)(EditorPaneContainer);
