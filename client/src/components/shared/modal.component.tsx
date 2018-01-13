import * as React from "react";

interface ModalProps {
  id: string;
  bodyComponent: React.ComponentType;
  bodyComponentProps?: any;
  footerComponent?: React.ComponentType;
  footerComponentProps?: any;
  title?: string;
  dismissible?: boolean; // default: true
}

class ModalComponent extends React.Component<ModalProps, {}> {
  public render() {
    const {id, bodyComponent: C, bodyComponentProps, ...rest} = this.props;
    return (
      <div
        className="modal fade"
        id={id}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              {this.renderTitle()}
              {this.renderDismissButton()}
            </div>
            <div className="modal-body">
              <C {...bodyComponentProps} />
            </div>
            {this.renderFooter()}
          </div>
        </div>
      </div>
    );
  }

  private renderTitle() {
    if ("title" in this.props) {
      return <h5 className="modal-title" id="modal-label">{this.props.title}</h5>;
    }
    return null;
  }

  private renderDismissButton() {
    const {dismissible = true} = this.props;
    if (dismissible) {
      return (
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      );
    }
    return null;
  }

  private renderFooter() {
    if ("footerComponent" in this.props) {
      const {footerComponent: C, footerComponentProps} = this.props;
      return (
        <div className="modal-footer">
          <C {...footerComponentProps} />
        </div>
      );
    }
    return null;
  }
}

export default ModalComponent;
