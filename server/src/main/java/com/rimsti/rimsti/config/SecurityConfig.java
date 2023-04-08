package com.rimsti.rimsti.config;

import com.rimsti.rimsti.service.registrationService.AppUserService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@AllArgsConstructor
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final AppUserService appUserService;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests()

                .antMatchers(HttpMethod.GET, "/api/**").permitAll()
                .antMatchers(HttpMethod.POST, "/api/auth/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/user/update/**").permitAll() // update gender and birthday
                .antMatchers(HttpMethod.PUT, "/api/user/update/password/**").permitAll() // update password
                .antMatchers(HttpMethod.POST, "/api/order/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/order/update/**").permitAll() // update password
                .antMatchers(HttpMethod.PUT, "/api/order/update/status/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/order/update/proofPayment/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/order/update/orNumber/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/order/delete/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/product/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/product/update/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/product/list/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/product/delete/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/product/rate/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/category/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/category/update/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/delete/**").permitAll()

                .antMatchers(HttpMethod.POST, "/api/wishlist/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/wishlist/**").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/wishlist/delete/**").permitAll()

                .antMatchers(HttpMethod.PUT, "/api/productRating/**/rate/**").permitAll()

                .anyRequest()
                .authenticated()
                .and()
                .httpBasic();
    }

    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("authorization", "content-type", "x-auth-token"));
        configuration.setExposedHeaders(Arrays.asList("x-auth-token"));
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
