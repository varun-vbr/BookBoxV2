package com.bookboxv2.bookreadservice.models;

public class ErrorObject {
    private String msg;
    private int statusCode;
    private String status;
    private boolean operational;

    public ErrorObject(String msg, int statusCode, String status, boolean operational) {
        this.msg = msg;
        this.statusCode = statusCode;
        this.status = status;
        this.operational = operational;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(int statusCode) {
        this.statusCode = statusCode;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public boolean isOperational() {
        return operational;
    }

    public void setOperational(boolean operational) {
        this.operational = operational;
    }
}
