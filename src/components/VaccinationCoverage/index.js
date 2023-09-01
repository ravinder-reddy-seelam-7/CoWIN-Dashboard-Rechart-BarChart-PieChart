// Write your code here
import {BarChart, XAxis, YAxis, Legend, Bar, Tooltip} from 'recharts'
import './index.css'

const VaccinationCoverage = props => {
  const {last7DaysVaccination} = props
  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination Coverage</h1>

      <BarChart width={1000} height={300} data={last7DaysVaccination}>
        <XAxis dataKey="vaccineDate" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Dose1" fill="#2d87bb" />
        <Bar dataKey="Dose2" fill="#f54394" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
