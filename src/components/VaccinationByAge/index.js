// Write your code here
import {PieChart, Pie, Cell, Legend} from 'recharts'
import './index.css'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  console.log(vaccinationByAge)
  return (
    <div className="coverage-container">
      <h1 className="coverage-heading">Vaccination By Age</h1>

      <PieChart width={1000} height={300}>
        <Legend iconType="circle" />
        <Pie
          data={vaccinationByAge}
          startAngle={0}
          endAngle={360}
          dataKey="count"
        >
          <Cell name="18-44" fill="#2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
