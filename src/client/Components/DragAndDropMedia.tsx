import React, { Component } from 'react';

export default class DragAndDropMedia extends Component {
  componentDidMount() {
    window.addEventListener('dragover', e => {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer && (e.dataTransfer.dropEffect = 'copy');
      // console.log(e);
    });
    window.addEventListener('drop', e => {
      e.stopPropagation();
      e.preventDefault();
      if (e.dataTransfer) {
        if (e.dataTransfer.files[0]) {
          const reader = new FileReader();
          reader.readAsDataURL(e.dataTransfer.files[0]);
          reader.onload = () => {
            if (typeof reader.result === 'string') {
              console.log(reader.result);
            }
          };
        }
      }
    });
  }
  render() {
    return <div />;
  }
}
