// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import './index.css'

const apiStatusConstants = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
    apiStatus: apiStatusConstants.inProgress,
  }

  componentDidMount() {
    this.getCovidVaccinationData()
  }

  getCovidVaccinationData = async () => {
    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    if (response.ok === false) {
      this.setState({apiStatus: apiStatusConstants.failure})
    } else {
      const data = await response.json()
      const updatedVaccinationCoverage = data.last_7_days_vaccination.map(
        eachItem => ({
          Dose1: eachItem.dose_1,
          Dose2: eachItem.dose_2,
          vaccineDate: eachItem.vaccine_date,
        }),
      )
      const updatedVaccinationByAge = data.vaccination_by_age.map(eachItem => ({
        age: eachItem.age,
        count: eachItem.count,
      }))
      const updatedVaccinationByGender = data.vaccination_by_gender.map(
        eachItem => ({
          count: eachItem.count,
          gender: eachItem.gender,
        }),
      )
      this.setState({
        vaccinationByAge: updatedVaccinationByAge,
        vaccinationByGender: updatedVaccinationByGender,
        last7DaysVaccination: updatedVaccinationCoverage,
        apiStatus: apiStatusConstants.success,
      })
    }
  }

  getLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  getFailureRoute = () => (
    <div className="failure-route-bg-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="failure-text">Something went wrong</h1>
    </div>
  )

  getSuccessRoute = () => {
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    return (
      <>
        <VaccinationCoverage last7DaysVaccination={last7DaysVaccination} />
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </>
    )
  }

  switchingCases = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.getLoader()
      case apiStatusConstants.failure:
        return this.getFailureRoute()
      case apiStatusConstants.success:
        return this.getSuccessRoute()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <nav className="nav-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="logo"
          />
          <p className="nav-text">Co-Win</p>
        </nav>
        <h1 className="heading">CoWIN Vaccination in India</h1>
        <div className="graph-bg-container">{this.switchingCases()}</div>
      </div>
    )
  }
}

export default CowinDashboard
