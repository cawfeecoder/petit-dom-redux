/* @jsx h */
import { h } from 'petit-dom';
import Component from '../Component';
import store from '../../../store';
const styles = require('./styles.styl');

export default class Counter extends Component {

    constructor(props){
        super();
        this.props = props;
        this.styles = styles;
        this.steps = 0;
    }

    render() {
        return(
            <div className={this.styles['test-class']}>
                <p style={`color: ${this.steps > 0 ? "red" : "black"}`}>
                    {this.props.title}
                    {": "}
                    {this.props.count}
                </p>
                <button onclick={() => this.props.increment()}>
                    Increment
                </button>
          </div>

        )
    }
}
