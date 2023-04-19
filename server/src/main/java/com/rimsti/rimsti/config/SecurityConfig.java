package com.rimsti.rimsti.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .cors()
                .and()
                .csrf().disable()
                .authorizeRequests()

                //users
                .antMatchers(HttpMethod.POST, "/api/user/login").permitAll()
                .antMatchers(HttpMethod.POST, "/api/user/register").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/user/**/address").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/user/changepassword/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/user/changeAddress/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/user/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/user/list").permitAll()

                //category
                .antMatchers(HttpMethod.POST, "/api/category/create").permitAll()
                .antMatchers(HttpMethod.GET, "/api/category/list/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/category/list").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/category/delete/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/category/update/**").permitAll()

                //order
                .antMatchers(HttpMethod.POST, "/api/order/create").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/order/update/status/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/order/list").permitAll()
                .antMatchers(HttpMethod.GET, " /api/order/list/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/order/list-sales").permitAll()
                .antMatchers(HttpMethod.GET, "/api/order/list/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/order/total-price").permitAll()

                //product
                .antMatchers(HttpMethod.POST, "/api/product/create").permitAll()
                .antMatchers(HttpMethod.GET, "/api/product/list/**").permitAll()
                .antMatchers(HttpMethod.GET, "/api/product/best-sellers").permitAll()
                .antMatchers(HttpMethod.GET, "/api/product/list").permitAll()
                .antMatchers(HttpMethod.DELETE, "/api/product/delete/**").permitAll()
                .antMatchers(HttpMethod.PUT, "/api/product/update/**").permitAll()

                //wishlist
                .antMatchers(HttpMethod.POST, "/api/wishlist/create").permitAll()
                .antMatchers(HttpMethod.GET, "/api/wishlist/**").permitAll()

                //socialmedia
                .antMatchers(HttpMethod.GET, "/oauth2/authorization/google").permitAll()
                .antMatchers(HttpMethod.GET, "/oauth2/authorization/facebook").permitAll()
                .antMatchers("/", "/error", "/webjars/**").permitAll()

                //product rating
                .antMatchers(HttpMethod.GET, "/api/productRating/customerRating").permitAll()

                .anyRequest()
                .authenticated()
                .and()
                .oauth2Login()
                .and()
                .httpBasic();

        return http.build();
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
