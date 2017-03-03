import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { receiveValue } from '../../actions';
import style from './Counter.css';
import { Spinner } from '../';
class Counter extends React.Component {

    constructor(props) {
        super(props);
        this.onClick = this.onClick.bind(this);
    }

    /*
     * 컴포넌트의 초기 AJAX 요청은 언제나 componentDidMount LifeCycle API 안에서 하세요.
     componentWillMount 안에 작성하여도 작동하긴 하나, 여기선 DOM Manipulation 이 불가합니다.
     서버사이드 렌더링시엔 componentDidMount는 실행되지 않고 componentWillMount 는 실행됩니다.

     그러나 최근엔 componentDidMount는에서 바로 요청 하는 것 보다
     redux-thunk, redux-promise-middleware, redux-saga등의 미들웨어를 통해서 작업하는것이 선호되고있습니다.
     *
     * */
    componentDidMount() {
        let getNumber = () => {
            axios.get('/counter').then(response => {
                this.props.onReceive(response.data.number);
                setTimeout(getNumber, 1000 * 5); // REPEAT THIS EVERY 5 SECONDS
            });

        }
        setTimeout(getNumber, 3000);
    }

    render() {
        const number = (
            <div className={style.number} ref={ ref => { this.element = ref } }>
                {this.props.value}
            </div>
        );
        const spinner = (
            <Spinner/>
        );
        return (
            <div className={style.container} onClick={this.onClick}>
                <div className={style.center}>
                    { (this.props.value == -1) ? spinner : number }
                </div>
            </div>
        )
    }

    componentDidUpdate() {
        /*
        *이 과정에서 React.js 에서 DOM 을 manipulate 할 때 쉽게 할 수 있게 해주는 ref가 사용되었습니다.
         컴포넌트가 업데이트 될 때마다 animation 클래스를 제거하고 다시 추가하는 방식으로 애니메이션을 적용하였습니다.
        * */
        this.element.classList.remove(style.bounce);
        this.element.offsetWidth; // Triggers reflow; enables restart animation
        this.element.classList.add(style.bounce);
    }

    //ajax 요청 클릭 이벤트
    onClick() {
        axios.post('/counter').then(response => {
            this.props.onReceive(response.data.number);
        });
    }
}

const mapStateToProps = (state) => {
    return {
            value: state.value
    };
};

const  mapDispatchToProps = (dispatch) => {
    return {
        onReceive: (value) => {
            dispatch(receiveValue(value));
        }
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Counter);