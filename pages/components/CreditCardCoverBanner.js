import { h, Component } from 'preact';
import { CreditCardCoverBanner } from '@insurance/credit-card-cover-banner';
import axios from "axios";

class CCCBanner extends Component {

    static async getInitialProps({ req }) {
        const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;

        const joke = await axios.get('http://api.icndb.com/jokes/random');

        return { userAgent, joke: joke.data.value.joke }
    }


    render(props) {
        return <CreditCardCoverBanner text={props.joke} />;
    }
}

export default CCCBanner;
