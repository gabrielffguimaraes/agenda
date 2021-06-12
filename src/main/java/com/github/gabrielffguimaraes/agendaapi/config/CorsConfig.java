package com.github.gabrielffguimaraes.agendaapi.config;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.util.Arrays;
import java.util.List;

@Configuration
public class CorsConfig {
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilterFilterRegistrationBean(){

        CorsConfiguration corsConfiguration = new CorsConfiguration();
        List<String> All = Arrays.asList("*");
        corsConfiguration.setAllowedOrigins(Arrays.asList("https://agenda-api-br.herokuapp.com"));
        corsConfiguration.setAllowedHeaders(All);
        corsConfiguration.setAllowedMethods(All);
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**",corsConfiguration);
        CorsFilter corsFilter = new CorsFilter(source);
        FilterRegistrationBean<CorsFilter> filter = new FilterRegistrationBean<>(corsFilter);
        filter.setOrder(Ordered.HIGHEST_PRECEDENCE);

        return filter;
    }
}
