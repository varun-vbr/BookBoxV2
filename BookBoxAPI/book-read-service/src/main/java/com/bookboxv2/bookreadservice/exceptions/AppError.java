package com.bookboxv2.bookreadservice.exceptions;

public class AppError extends RuntimeException{
    private String msg;
    private int statusCode;
    private String status;
    private boolean operational;
    private StackTraceElement[] trace;

    public AppError(String message, int statusCode, boolean operational, StackTraceElement[] stackTrace){
        this.msg = message;
        this.statusCode = statusCode;
        this.operational = operational;
        this.trace = stackTrace;
        this.status = String.valueOf(statusCode).startsWith("4") ? "fail" : "error";
    }

    public AppError(String message, int statusCode, boolean operational){
        this.msg = message;
        this.statusCode = statusCode;
        this.operational = operational;
        this.trace = new StackTraceElement[1];
        this.status = String.valueOf(statusCode).startsWith("4") ? "fail" : "error";
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

    public StackTraceElement[] getTrace() {
        return trace;
    }

    public void setTrace(StackTraceElement[] trace) {
        this.trace = trace;
    }
}
