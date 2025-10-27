import { Mail, Phone, MapPin, LinkedinIcon, Send} from "lucide-react";
import { cn } from "../lib/utils";
import emailjs from '@emailjs/browser';
import { useToast } from "../hooks/use-toast";
import { useRef, useState } from "react";

export const ContactSection = () =>{

    const [hasSent, setHasSent] = useState(false);

    const {toast} = useToast();

    const form = useRef();

    const handleSubmit = (e) => {
        e.preventDefault()
        emailjs
            .sendForm('service_owgh2nr', 'template_rxl2799', form.current, {
                publicKey: 'KgjFYqKXBSre-YHkt',
            })
            .then(
                () => {
                console.log('SUCCESS!');
                toast({
                    title: "Message Sent!!",
                    description: "Thank you for your message. I'll get back to you soon.",
                });
                setHasSent(true);

                },
                (error) => {
                console.log('FAILED...', error.text);
                toast({
                    title: "Something Went Wrong  =(",
                    description: "Unable to send message. Please email me directly or try again later.",
                });
                setHasSent(true);
                },
            );


    }

    return(
        <section id="contact" className="py-24 px-4 relative bg-secondary/30">
            <div className="container mx-auto max-w-5xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                    Get In <span className="text-primary"> Touch</span>
                </h2>
                <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
                    I'm currently open to work. Feel free to reach out as
                    I'm always open to discussing new opportunities. <br/>
                    Contact me by phone or email. You can even use the 'Send A Message' feature below which will email me as well.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-semibold mb-6">
                            Contact Information
                        </h3>
                        <div className="space-y-6 justify-center items-center">

                            <div className="flex justify-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <a href="mailto:justincpenny@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        <Mail className="h-6 w-6 text-primary"/>
                                    </a>
                                    
                                </div>
                                <div>
                                    <h4 className="font-medium"> Email</h4>
                                    <a href="mailto:justincpenny@hotmail.com" className="text-muted-foreground hover:text-primary transition-colors">
                                        Justincpenny@Hotmail.com
                                    </a>
                                </div>
                                <div className="empty div for styling">

                                </div>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <a href="tel:8177182527" className="text-muted-foreground hover:text-primary transition-colors">
                                        <Phone className="h-6 w-6 text-primary"/>
                                    </a>
                                </div>
                                <div>
                                    <h4 className="font-medium"> Phone</h4>
                                    <a href="tel:8177182527" className="text-muted-foreground hover:text-primary transition-colors">
                                        (817) - 718 - 2527
                                    </a>
                                </div>
                            </div>

                            <div className="flex justify-center space-x-4">
                                <div className="p-3 rounded-full bg-primary/10">
                                    <MapPin className="h-6 w-6 text-primary"/>
                                </div>
                                <div>
                                    <h4 className="font-medium"> Location</h4>
                                    <a className="text-muted-foreground hover:text-primary transition-colors">
                                        Summerville, SC, United States
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <h4 className="font-medium mb-4">
                                Connect With Me
                            </h4>
                            <div className="flex space-x-4 justify-center">
                                <a href="https://www.linkedin.com/in/justin-penny-b34703150/" target="_blank">
                                    <LinkedinIcon />
                                </a>

                            </div>
                        </div>
                    </div>
                    <div className="bg-card p-8 rounded-lg shadow-xs">
                        <h3 className="text-2xl font-semibold mb-6">
                            Send A Message
                        </h3>
                        <form className="space-y-6" onSubmit={handleSubmit} ref={form}>

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Your Name
                                </label>
                                <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                required 
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Justin Penny"></input>
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Your Email
                                </label>
                                <input 
                                id="email" 
                                name="email" 
                                required 
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Example@gmail.com"></input>
                            </div>


                            <div>
                                <label htmlFor="email" className="block text-sm font-medium mb-2">
                                    Subject
                                </label>
                                <input 
                                id="subject" 
                                name="subject" 
                                required 
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary"
                                placeholder="Subject"></input>
                            </div>


                            <div>
                                <label htmlFor="name" className="block text-sm font-medium mb-2">
                                    Your Message
                                </label>
                                <textarea 
                                type="text" 
                                id="message" 
                                name="message" 
                                required 
                                className="w-full px-4 py-3 rounded-md border border-input bg-background focus:outline-hidden focus:ring-2 focus:ring-primary resize-none"
                                placeholder="Hello, I'd like to talk about..."></textarea>
                            </div>
                            <button 
                            disabled = {hasSent}
                            type="submit" 
                            className={cn("cosmic-button w-full flex items-center justify-center gap-2",

                            )}>
                                {hasSent ? "Sent!" : "Send Message"}
                            <Send size={16}/>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}