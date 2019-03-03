import { h, Component } from 'preact';
import axios from 'axios';

class Test extends Component {

    static async getInitialProps({ req }) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

        const joke = await axios.get('http://api.icndb.com/jokes/random');

        return { userAgent, joke: joke.data.value.joke }
    }

    render(props) {
        return <h1>HELLO, { props.joke }</h1>;
    }
}

export default Test;
