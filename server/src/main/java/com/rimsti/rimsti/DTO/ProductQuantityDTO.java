package com.rimsti.rimsti.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class ProductQuantityDTO {

    private Long productId;
    private int quantity;
}
