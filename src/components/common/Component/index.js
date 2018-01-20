/* @jsx h */
import { h, mount, patch, unmount } from "petit-dom";
import merge from 'deepmerge';
import equal from 'deep-equal';

const RESERVED_TAGS = ['_tag', 'props', 'content', 'styles'];
var componentState = {
};

export default class Component {

    constructor(props = {}, content = null, state = {}){
        this._tag = "x-" + this.constructor.name.toLowerCase();
        this.props = props;
        this.content = content
        state = state;
        componentState = merge(componentState, state);
        Object.freeze(componentState);
        Object.freeze(this.state);
    }

    mount() {
        if(this.componentWillMount){
            this.componentWillMount();
        }
        this._vnode = h(this._tag, null, this.render());
        const node = mount(this._vnode);
        node.$$instance = this;
        if (this.componentDidMount){
            this.componentDidMount();
        }
        return node;
    }
    
    patch(node, props, oldProps, content, oldContent){
        if(!equal(props, oldProps) && this.componentWillReceiveProps){
            this.componentWillReceiveProps();
        }
        this.props = props;
        this.content = content;
        this.update();
        return node;
    }
    
    unmount(node) {
        if(this.componentWillUnMount){
            this.componentWillUnmount();
        }
        node.$$instance = null;
        return unmount(this._vnode);
    }

    update() {
        if(this.componentWillUpdate){
            this.componentWillUpdate();
        }
        const oldVnode = this._vnode;
        this._vnode = h(this._tag, null, this.render());
        patch(this._vnode, oldVnode);
        if(!equal(oldVnode.props, this._vnode.props) || !equal(oldVnode.state, this._vnode.state)){
            if(this.componentDidUpdate){
                this.componentDidUpdate();
            }
        }
    }

    setState(newState) {
        var tmpObj = {};
        for(var i in componentState){
            tmpObj[i] = componentState[i];
        }
        componentState = merge(tmpObj, newState);
        Object.freeze(componentState);
        Object.freeze(this.state);
    }
}