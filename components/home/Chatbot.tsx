// @ts-nocheck
'use client';
import React, { useEffect, useState } from 'react';
import ChatBot, { Step } from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useToast } from '../ui/use-toast';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  marketingRequirement: string;
  desiredService: string;
  salesDepAgreement: string;
}

interface Option {
  value: string;
  label: string;
  trigger: string;
}

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Helvetica Neue',
  headerBgColor: '#EF9C00',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#EF9C00',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

const Chatbot = ({ toggle }) => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
    marketingRequirement: '',
    desiredService: '',
    salesDepAgreement: 'yes',
  });

  const { toast } = useToast();

  // Function to handle user choices
  const handleChoice = (label: string) => {
    // Update the userDetails state with the chosen label
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      salesDepAgreement: label,
    }));
  };

  const steps: Step[] = [
    {
      id: '1',
      message: "Hello! I'm your assistant.",
      trigger: '2',
    },
    {
      id: '2',
      message: 'To better assist you, may I have your name?',
      trigger: '3',
    },
    {
      id: '3',
      user: true,
      trigger: '4',
      validator: (value: string) => {
        if (!value || value.trim() === '') {
          return 'Please provide a valid name.';
        } else {
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            name: value,
          }));
          return true;
        }
      },
    },
    {
      id: '4',
      message: 'Thanks {previousValue}! What is your email address?',
      trigger: '5',
    },
    {
      id: '5',
      user: true,
      trigger: '6',
      validator: (value: string) => {
        if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
          return 'Oops! It seems like you\'ve entered an invalid email. Please provide a valid email address.';
        } else {
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            email: value,
          }));
          return true;
        }
      },
    },
    {
      id: '6',
      message: 'Great! Lastly, can you share your phone number with us?',
      trigger: '7',
    },
    {
      id: '7',
      user: true,
      trigger: '8',
      validator: (value: string) => {
        if (!value || !/^\d{10}$/.test(value)) {
          return 'Oops! It seems like you\'ve entered an invalid phone number. Please provide a valid phone number.';
        } else {
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            phone: value,
          }));
          return true;
        }
      },
    },
    {
      id: '8',
      message: `Excellent, ${userDetails.name}! Now, could you tell us what your primary marketing requirement is?`,
      trigger: 'marketing_requirement_options',
    },
    {
      id: 'marketing_requirement_options',
      options: ([
        {
          value: 'social_media',
          label: 'Social Media Marketing',
          trigger: 'social_media_question',
        },
        {
          value: 'seo',
          label: 'Search Engine Optimization (SEO)',
          trigger: 'seo_question',
        },
        {
          value: 'email_marketing',
          label: 'Email Marketing',
          trigger: 'email_marketing_question',
        },
        {
          value: 'content_marketing',
          label: 'Content Marketing',
          trigger: 'content_marketing_question',
        },
      ] as unknown) as Option[],
    },
    // Social Media Marketing
    {
      id: 'social_media_question',
      message:
        'Fantastic! Social Media Marketing is a powerful tool. How can we specifically assist you with it?',
      trigger: 'get_social_media_details',
    },
    {
      id: 'get_social_media_details',
      user: true,
      trigger: '10',
      validator: (value: string) => {
        if (!value || value.trim() === '') {
          return 'Please provide a valid name.';
        } else {
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            desiredService: value,
            marketingRequirement: 'social_media',
          }));
          return true;
        }
      },
    },
    {
      id: '10',
      message:
        "Lastly, would you like to talk to our sales department? Please reply with 'Yes' or 'No'.",
      trigger: 'sales_department_options',
    },
    {
      id: 'sales_department_options',
      options: [
        { value: 'Yes', label: 'Yes', trigger: 'connect_to_sales' },
        { value: 'No', label: 'No', trigger: 'goodbye_message' },
      ] as Option[],
    },
    {
      id: 'connect_to_sales',
      message: 'Great choice! Please wait while we connect you to an agent.',
      trigger: () => handleChoice('Yes'),
      end: true,
    },
    {
      id: 'goodbye_message',
      message:
        'Thank you for considering our services. If you have any more questions in the future, feel free to reach out. Have a great day!',
      trigger: () => handleChoice('No'),
      end: true,
    },
    // SEO
    {
      id: 'seo_question',
      message:
        'Awesome! SEO is crucial for online visibility. What specifically are you looking to achieve with SEO?',
      trigger: 'get_seo_details',
    },
    {
      id: 'get_seo_details',
      user: true,
      trigger: '12',
      validator: (value: string) => {
        if (!value || value.trim() === '') {
          return 'Please provide a valid name.';
        } else {
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            desiredService: value,
            marketingRequirement: 'SEO',
          }));
          return true;
        }
      },
    },
    {
      id: '12',
      message:
        "Lastly, would you like to talk to our sales department? Please reply with 'Yes' or 'No'.",
      trigger: 'sales_department_options',
    },
    {
      id: 'sales_department_options',
      options: [
        { value: 'Yes', label: 'Yes', trigger: 'connect_to_sales' },
        { value: 'No', label: 'No', trigger: 'goodbye_message' },
      ] as Option[],
    },
    {
      id: 'connect_to_sales',
      message: 'Great choice! Please wait while we connect you to an agent.',
      trigger: () => handleChoice('Yes'),
      end: true,
    },
    {
      id: 'goodbye_message',
      message:
        'Thank you for considering our services. If you have any more questions in the future, feel free to reach out. Have a great day!',
      trigger: () => handleChoice('No'),
      end: true,
    },
    // Email Marketing
    {
      id: 'email_marketing_question',
      message:
        'Terrific! Email Marketing is a great way to connect. What are your specific goals with email marketing?',
      trigger: 'get_email_marketing_details',
    },
    {
      id: 'get_email_marketing_details',
      user: true,
      trigger: '14',
      validator: (value: string) => {
        if (!value || value.trim() === '') {
          return 'Please provide a valid name.';
        } else {
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            desiredService: value,
            marketingRequirement: 'email_marketing',
          }));
          return true;
        }
      },
    },
    {
      id: '14',
      message:
        "Lastly, would you like to talk to our sales department? Please reply with 'Yes' or 'No'.",
      trigger: 'sales_department_options',
    },
    {
      id: 'sales_department_options',
      options: [
        { value: 'Yes', label: 'Yes', trigger: 'connect_to_sales' },
        { value: 'No', label: 'No', trigger: 'goodbye_message' },
      ] as Option[],
    },
    {
      id: 'connect_to_sales',
      message: 'Great choice! Please wait while we connect you to an agent.',
      trigger: () => handleChoice('Yes'),
      end: true,
    },
    {
      id: 'goodbye_message',
      message:
        'Thank you for considering our services. If you have any more questions in the future, feel free to reach out. Have a great day!',
      trigger: () => handleChoice('No'),
      end: true,
    },
    // Content Marketing
    {
      id: 'content_marketing_question',
      message:
        'Wonderful! Content Marketing is key. What kind of content are you focusing on?',
      trigger: 'get_content_marketing_details',
    },
    {
      id: 'get_content_marketing_details',
      user: true,
      trigger: '16',
      validator: (value: string) => {
        if (!value || value.trim() === '') {
          return 'Please provide a valid name.';
        } else {
          setUserDetails((prevUserDetails) => ({
            ...prevUserDetails,
            desiredService: value,
            marketingRequirement: 'content_marketing',
          }));
          return true;
        }
      },
    },
    {
      id: '16',
      message:
        "Lastly, would you like to talk to our sales department? Please reply with 'Yes' or 'No'.",
      trigger: 'sales_department_options',
    },
    {
      id: 'sales_department_options',
      options: [
        { value: 'Yes', label: 'Yes', trigger: 'connect_to_sales' },
        { value: 'No', label: 'No', trigger: 'goodbye_message' },
      ] as Option[],
    },
    {
      id: 'connect_to_sales',
      message: 'Great choice! Please wait while we connect you to an agent.',
      trigger: () => handleChoice('Yes'),
      end: true,
    },
    {
      id: 'goodbye_message',
      message:
        'Thank you for considering our services. If you have any more questions in the future, feel free to reach out. Have a great day!',
      end: true,
      trigger: () => handleChoice('No'),
    },
  ];
  useEffect(() => {
    if (userDetails.desiredService) {
      async function fetchUserData() {
        toggle();
        const response = await fetch(`/api/create-user`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userDetails),
        });

        await response.json();

        // Handle successful response
        if (response.ok) {
          toast({
            title: 'We will reach you soon!',
          });
          setTimeout(() => {
            toggle();
          }, 1500);
        }
      }
    }

    setTimeout(() => {
      fetchUserData();
    }, 1500);
  }, [userDetails.desiredService]);
  return (
    <ThemeProvider theme={theme}>
      <ChatBot steps={steps} />
    </ThemeProvider>
  );
};

export default Chatbot;
