package com.example.marketandtrade.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "person_details")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PersonDetails {

    @Id
    @Column(name = "username", nullable = false, length = 15)
    private String idno;

    @Column(name = "fname", nullable = false, length = 50)
    private String fname;

    @Column(name = "lname", nullable = false, length = 50)
    private String lname;

    @Column(name = "email", nullable = false, unique = true, length = 100)
    private String email;

    @Column(name = "phone", nullable = false, length = 15)
    private String phone;

    @Column(name = "department", length = 50)
    private String department;

    @Column(name = "password", nullable = false, length = 255)
    private String password; // Store hashed passwords

    @Column(name = "role", nullable = false, length = 20)
    private String role; // Role-based access control (User/Admin)

    @Column(name = "credits", nullable = false)
    private int credits; // Stores user credits for scheme verification

    public int getCredits() {
        return credits;
    }

    public void setCredits(int credits) {
        this.credits = credits;
    }

    public String getIdno() {
        return idno;
    }

    public void setIdno(String idno) {
        this.idno = idno;
    }

    public String getFname() {
        return fname;
    }

    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

//
//    public List<Issue> getReportedIssues() {
//        return reportedIssues;
//    }
//
//    public void setReportedIssues(List<Issue> reportedIssues) {
//        this.reportedIssues = reportedIssues;
//    }
//
//    public List<Vote> getVotes() {
//        return votes;
//    }
//
//    public void setVotes(List<Vote> votes) {
//        this.votes = votes;
//    }
}
