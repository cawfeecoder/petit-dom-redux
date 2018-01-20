/* @jsx h */
import { h } from 'petit-dom';
import * as actions from '../../store/actions';
import Component from '../../components/common/Component';
import store from '../../store/index';
import Counter from '../../components/common/Counter'
const styles = require('./styles.styl');

class App extends Component {

    constructor(props){
        super(props);
        this.todos = [];
        this.styles = styles;
        this.count = 0;
        store.subscribe(() => {
            this.count = store.getState().count;
            this.update();
        })
        store.subscribe(() => {
            this.todos = store.getState().todos;
            this.update();
        })
    }

    componentWillUpdate() {
        this.count += 1;
    }

    addTodo(e){
        if(e.keyCode == 13){
            console.log(this.todos);
            store.dispatch(actions.add_todo({id: this.todos.length, content: e.target.value, complete: false}))
            e.target.value = "";
        }
        this.count += 1;
        this.update();
    }

    render() {
        return (
        <div className={this.styles.rootContainer}>
            <div className={this.styles.infoContainer}>
                <h3>Petit DOM</h3>
                <p> Example </p>
                <a href> Source </a>

            </div>
            <div className={this.styles.todoContainer}>
                <h1> todos </h1>
                <div className={this.styles.todoInputListContainer}>
                    <div className={this.styles.todoInputContainer}>
                        <input onkeydown={(e) => this.addTodo(e)} placeholder="What needs to be done?"/>
                    </div>
                    {this.todos.map(todo => <div className={this.styles.todoListContainer}>{todo.content}</div>)}
                </div>
                {this.todos.length > 0 ? (<div className={this.styles.footerContainer}>
                    <div>
                        <p className={this.styles.itemsLeftText}>
                            {this.todos.filter((todo) => !todo.complete).length}
                            {this.todos.filter((todo) => !todo.complete).length > 1 ? " items left" : " item left"}
                        </p>
                    </div>
                    <div></div>
                    <div></div>
                </div>) : null}
                <div className={this.styles.textContainer}>
                    <p> Double click to edit a todo </p>
                    <p> Written by Nicholas Frush </p>
                    <p> TodoMVC Example </p>
                </div>
                <Counter count={this.count}/>
            </div>
        </div>
        )
    }
}

export default App;