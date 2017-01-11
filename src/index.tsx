import * as React from "react";
import * as ReactDOM from "react-dom";
import * as ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class AnimatedShoppingList extends React.Component<{}, { items: any[], newItem?: string }> {
    constructor() {
        super(...arguments);
        this.state = {
            items: [
                { id: 1, name: 'Milk' },
                { id: 2, name: 'Yogurt' },
                { id: 3, name: 'Orange Juice' }
            ]
        }
    }

    handleChange(evt: React.KeyboardEvent<HTMLInputElement>) {
        if (evt.key === "Enter") {
            let newItem = { id: Date.now(), name: (evt.target as HTMLInputElement).value };
            let newItems = this.state.items.concat(newItem);
            (evt.target as HTMLInputElement).value = "";
            this.setState({ items: newItems });
        }
    }

    handleRemove(i: number) {
        var newItems = this.state.items;
        newItems.splice(i, 1);
        this.setState({ items: newItems });
    }

    render() {
        let shoppingItems = this.state.items.map((item, i) => (
            <div key={item.id} className="item" onClick={this.handleRemove.bind(this, i)}>
                {item.name}
            </div>
        ));

        return (
            <div>
                <ReactCSSTransitionGroup transitionName="example" transitionEnterTimeout={300} transitionLeaveTimeout={300} transitionAppear={true}
                    transitionAppearTimeout={300}>
                    {shoppingItems}
                </ReactCSSTransitionGroup>

                <input type="text" value={this.state.newItem} onKeyDown={this.handleChange.bind(this)} />
            </div>
        );
    }
}


ReactDOM.render(<AnimatedShoppingList />, document.getElementById("root"));