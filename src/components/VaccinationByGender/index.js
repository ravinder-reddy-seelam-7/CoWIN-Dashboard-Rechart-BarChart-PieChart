// Write your code here
import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination By Gender</h1>

      <PieChart width={1000} height={300}>
        <Legend iconType="circle" />
        <Pie
          data={vaccinationByGender}
          startAngle={180}
          endAngle={0}
          dataKey="count"
          innerRadius={60}
        >
          <Cell name="Male" fill="#f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
        </Pie>
      </PieChart>
    </div>
  )
}

export default VaccinationByGender
