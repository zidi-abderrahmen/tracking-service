package com.ia.servicesmanagementdb.dto;

import lombok.Data;

@Data
public class ClientRequest {

    private String companyName;
    private String tradeRegister;
    private Float dailyRate;
    private String firstName;
    private String lastName;
    private String email;
    private String address;
    private String phone;

}
