package com.example.react;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class FrontendController {

    @RequestMapping(value = "/hello", method = RequestMethod.GET)
    public String home(Model model) {
        model.addAttribute("message", "Hello, World!!!");
        System.out.println("뜨아아아~~");
        return "index.html";
    }
    
}