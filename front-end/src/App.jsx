import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import PrivateRoutes from "./utils/PrivateRoutes";
import RoleBaseRoutes from "./utils/RoleBaseRoutes";
import AdminSummary from "./components/dashboard/AdminSummary";
import Department from "./components/department/DepartmentList";
import AddDepartment from "./components/department/AddDepartment";
import EditDepartment from "./components/department/EditDepartment";
import EmployeeList from "./components/employee/EmployeeList";
import AddEmployee from "./components/employee/AddEmployee";
import ViewEmployee from "./components/employee/ViewEmployee";
import EditEmployee from "./components/employee/EditEmployee";
import AddSalary from "./components/salary/AddSalary";
import ViewSalary from "./components/salary/ViewSalary";
import Summary from "./components/EmployeeDashboard/Summary";
import LeaveList from "./components/leave/LeaveList";
import AddLeave from "./components/leave/AddLeave";
import Setting from "./components/EmployeeDashboard/Setting";
import LeaveTable from "./components/leave/LeaveTable";
import LeaveDetail from "./components/leave/LeaveDetail";
import Attendance from "./components/attendance/Attendance";
import AttendanceReport from "./components/attendance/AttendanceReport";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Dashboard */}
        <Route path="/" element={<Navigate to={"/admin-dashboard"} />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/admin-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin"]}>
                <AdminDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<AdminSummary />}></Route>

          <Route
            path="/admin-dashboard/departments"
            element={<Department />}
          ></Route>

          <Route
            path="/admin-dashboard/add-department"
            element={<AddDepartment />}
          ></Route>

          <Route
            path="/admin-dashboard/departments/:id"
            element={<EditDepartment />}
          ></Route>

          <Route
            path="/admin-dashboard/employees"
            element={<EmployeeList />}
          ></Route>

          <Route
            path="/admin-dashboard/add-employee"
            element={<AddEmployee />}
          ></Route>

          <Route
            path="/admin-dashboard/employees/:id"
            element={<ViewEmployee />}
          ></Route>

          <Route
            path="/admin-dashboard/employees/edit/:id"
            element={<EditEmployee />}
          ></Route>

          <Route
            path="/admin-dashboard/employees/salary/:id"
            element={<ViewSalary />}
          ></Route>

          <Route
            path="/admin-dashboard/employees/leaves/:id"
            element={<LeaveList />}
          ></Route>

          <Route
            path="/admin-dashboard/salary/add"
            element={<AddSalary />}
          ></Route>

          <Route
            path="/admin-dashboard/leaves"
            element={<LeaveTable />}
          ></Route>

          <Route
            path="/admin-dashboard/leaves/:id"
            element={<LeaveDetail />}
          ></Route>

          <Route
            path="/admin-dashboard/setting"
            element={<Setting />}
          ></Route>

          <Route
            path="/admin-dashboard/attendance"
            element={<Attendance />}
          ></Route>

          <Route
            path="/admin-dashboard/attendance-report"
            element={<AttendanceReport />}
          ></Route>
        </Route>
        {/* Employee Dashboard */}
        <Route
          path="/employee-dashboard"
          element={
            <PrivateRoutes>
              <RoleBaseRoutes requiredRole={["admin", "employee"]}>
                <EmployeeDashboard />
              </RoleBaseRoutes>
            </PrivateRoutes>
          }
        >
          <Route index element={<Summary />}></Route>

          <Route
            path="/employee-dashboard/profile/:id"
            element={<ViewEmployee />}
          ></Route>

          <Route
            path="/employee-dashboard/leaves/:id"
            element={<LeaveList />}
          ></Route>

          <Route
            path="/employee-dashboard/add-leave"
            element={<AddLeave />}
          ></Route>

          <Route
            path="/employee-dashboard/salary/:id"
            element={<ViewSalary />}
          ></Route>

          <Route
            path="/employee-dashboard/setting"
            element={<Setting />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
