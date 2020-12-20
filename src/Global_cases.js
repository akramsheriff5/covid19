import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

//This Component is a child Component of Customers Component
export default class global extends Component {

  constructor(props) {
    super(props);
    this.state = {}
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getglobal(this.props.val)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getglobal(this.props.val)
    }
  }

  //Function to Load the global data from json.
  getglobal() {
    // axios.get('assets/samplejson/customer' + id + '.json').then(response => {
    //   this.setState({global: response})
    // })
     axios.get(" https://api.covid19api.com/summary").then((response) => {
			console.log(response, "hi")
			console.log(response.data.Global, "hi")
			  this.setState({ global: response.data.Global })

			// this.state(response.global)
		})
  };

  render() {
    if (!this.state.global)
      return (<p>Loading Data</p>)
    return (
		<div className="global row">
			<Panel bsStyle="info" className="centeralign">
				<Panel.Heading>
					<Panel.Title componentClass="h3">Global</Panel.Title>
				</Panel.Heading>
				<Panel.Body>
					<p>TotalConfirmed : {this.state.global.TotalConfirmed}</p>
					<p>TotalRecovered : {this.state.global.TotalRecovered}</p>
					<p>TotalDeaths : {this.state.global.TotalDeaths}</p>
					<p>NewConfirmed : {this.state.global.NewConfirmed}</p>
					<p>NewDeaths : {this.state.global.NewDeaths}</p>
					<p>NewRecovered : {this.state.global.NewRecovered}</p>
					{/* <p>
						Additional Info :{" "}
						{this.state.global.data.additionalInfo}
					</p> */}
				</Panel.Body>
			</Panel>
		</div>
	)
  }
}
