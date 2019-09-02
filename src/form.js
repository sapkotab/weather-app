import React from 'react';
class Form extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.loadWeather}>
                <input type="text" name="zip" placeholder="Zip Code"/>
                {/* <input type="text" name="country" placeholder="Country" /> */}
                <button>Get Forecast</button>
            </form>
        )
    }
}
export default Form;