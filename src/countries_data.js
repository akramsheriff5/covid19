import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
// import Button from 'react-bootstrap/lib/Button'
import CustomerDetails from './Global_cases'
import axios from 'axios'

export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: 1
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Customer Data from json
  getCustomerData() {
  
    axios.get(" https://api.covid19api.com/summary").then((response) => {
		console.log(response.data.Countries, "hitou")
    this.setState({ countries: response.data.Countries })
	})
  };

  render() {

    if (!this.state.countries)
      return (<p>Loading data</p>)
    return (
		<div className="addmargin">
			<div className="col-md-3">
				{this.state.countries.map((customer) => (
					<Panel
						bsStyle="info"
						key={customer.Country}
						className="centeralign"
					>
						<Panel.Heading>
							<Panel.Title componentClass="h3">
								{customer.Country}
							</Panel.Title>
						</Panel.Heading>
						<Panel.Body>
							<p>Today Confirmed:{customer.NewConfirmed}</p>
							<p>Today Death {customer.NewDeaths}</p>
							<p>Today Recovered{customer.NewRecovered}</p>
							{/* <Button
								bsStyle="info"
								onClick={() =>
									this.setState({
										selectedCustomer: customer.id
									})
								}
							>
								Click to View Details
							</Button> */}
						</Panel.Body>
					</Panel>
				))}
			</div>
			<div className="col-md-6">
				<CustomerDetails val={this.state.selectedCustomer} />
			</div>
		</div>
	)
  }

}
