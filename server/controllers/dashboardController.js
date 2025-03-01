import Department from "../models/Department.js"
import Employee from "../models/Employee.js"
import Leave from "../models/Leave.js"
import Salary from "../models/Salary.js"


const getSummary = async (req, res) => {
    try {
        const totalEmployees = await Employee.countDocuments()
        const totalDepartments = await Department.countDocuments()
        const totalSalaries = await Salary.aggregate([
            {$group: {_id: null, totalSalary: {$sum: "$salary"}}}
        ])
        const employeeAppliedForLeave = await Leave.distinct('employeeId')
        const leaveStatus = await Leave.aggregate([
            {$group: {
                _id: "$status",
                count: {$sum: 1}
            }}
        ])
        const leaveSummary = {
            appliedFor: employeeAppliedForLeave.length,
            approved: leaveStatus.find(item => item._id === 'Approved')?.count || 0,
            rejected: leaveStatus.find(item => item._id === 'Rejected')?.count || 0,
            pending: leaveStatus.find(item => item._id === 'Pending')?.count || 0,
        }

        return res.status(200).json({
            success: true,
            totalEmployees,
            totalDepartments,
            totalSalary: totalSalaries[0]?.totalSalary || 0,
            leaveSummary
        })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({success: false, error: 'Get Summary Server Error'})
    }
}

export {getSummary}