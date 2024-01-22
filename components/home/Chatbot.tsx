'use client';
import React, { useEffect, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { useToast, reducer } from '../ui/use-toast';

interface UserDetails {
  name: string;
  email: string;
  phone: string;
  marketingRequirement: string;
  desiredService: string;
  salesDepAgreement: string;
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

const Chatbot = () => {
  const [userDetails, setUserDetails] = useState<UserDetails>({
    name: '',
    email: '',
    phone: '',
    marketingRequirement: '',
    desiredService: '',
    salesDepAgreement: '',
  });

  const { toast } = useToast();

  const isValidName = (value: string) => {
    if (!value || value.trim() === '') {
      return 'Please provide a valid name.';
    } else {
      return true;
    }
  };

  const isValidEmail = (value: string) => {
    if (!value || !/^\S+@\S+\.\S+$/.test(value)) {
      return 'Oops! It seems like you\'ve entered an invalid email. Please provide a valid email address.';
    } else {
      setUserDetails((prevUserDetails) => ({
        ...prevUserDetails,
        email: value,
      }));
      return true;
    }
  };

  const isValidPhone = (value: string) => {
    if (!value || !/^\d{10}$/.test(value)) {
      return 'Oops! It seems like you\'ve entered an invalid phone number. Please provide a valid phone number.';
    } else {
      return true;
    }
  };

  function handleEnd(steps: any, values: any) {
    console.log(steps);
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      name: values[0],
      email: values[1],
      phone: values[2],
      marketingRequirement: values[3],
      desiredService: values[4],
      salesDepAgreement: values[5],
    }));
  }

  const steps = [
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
        const result = isValidName(value);
        return result;
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
        const result = isValidEmail(value);
        return result;
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
        const result = isValidPhone(value);
        return result;
      },
    },
    {
      id: '8',
      message: `Excellent, ${userDetails.name}! Now, could you tell us what your primary marketing requirement is?`,
      trigger: '9',
    },
    {
      id: '9',
      options: [
        {
          value: 'social_media',
          label: 'Social Media Marketing',
          trigger: '10',
        },
        {
          value: 'seo',
          label: 'Search Engine Optimization (SEO)',
          trigger: '11',
        },
        {
          value: 'email_marketing',
          label: 'Email Marketing',
          trigger: '12',
        },
        {
          value: 'content_marketing',
          label: 'Content Marketing',
          trigger: '13',
        },
      ],
    },
    // Social Media Marketing
    {
      id: '10',
      message:
        'Fantastic! Social Media Marketing is a powerful tool. How can we specifically assist you with it?',
      trigger: '14',
    },
    {
      id: '14',
      user: true,
      trigger: '15',
    },
    {
      id: '15',
      message:
        "Lastly, would you like to talk to our sales department? Please reply with 'Yes' or 'No'.",
      trigger: '16',
    },
    {
      id: '16',
      options: [
        { value: 'Yes', label: 'Yes', trigger: '17' },
        { value: 'No', label: 'No', trigger: '18' },
      ],
    },
    {
      id: '17',
      message: 'Great choice! Please wait while we connect you to an agent.',

      end: true,
    },
    {
      id: '18',
      message:
        'Thank you for considering our services. If you have any more questions in the future, feel free to reach out. Have a great day!',
      end: true,
    },
    // SEO
    {
      id: '11',
      message:
        'Awesome! SEO is crucial for online visibility. What specifically are you looking to achieve with SEO?',
      trigger: '19',
    },
    {
      id: '19',
      user: true,
      trigger: '20',
    },
    {
      id: '20',
      message:
        "Lastly, would you like to talk to our sales department? Please reply with 'Yes' or 'No'.",
      trigger: '21',
    },
    {
      id: '21',
      options: [
        { value: 'Yes', label: 'Yes', trigger: '22' },
        { value: 'No', label: 'No', trigger: '23' },
      ],
    },
    {
      id: '22',
      message: 'Great choice! Please wait while we connect you to an agent.',
      end: true,
    },
    {
      id: '23',
      message:
        'Thank you for considering our services. If you have any more questions in the future, feel free to reach out. Have a great day!',
      end: true,
    },
    // Email Marketing
    {
      id: '12',
      message:
        'Terrific! Email Marketing is a great way to connect. What are your specific goals with email marketing?',
      trigger: '24',
    },
    {
      id: '24',
      user: true,
      trigger: '25',
    },
    {
      id: '25',
      message:
        "Lastly, would you like to talk to our sales department? Please reply with 'Yes' or 'No'.",
      trigger: '26',
    },
    {
      id: '26',
      options: [
        { value: 'Yes', label: 'Yes', trigger: '27' },
        { value: 'No', label: 'No', trigger: '28' },
      ],
    },
    {
      id: '27',
      message: 'Great choice! Please wait while we connect you to an agent.',
      end: true,
    },
    {
      id: '28',
      message:
        'Thank you for considering our services. If you have any more questions in the future, feel free to reach out. Have a great day!',
      end: true,
    },
    // Content Marketing
    {
      id: '13',
      message:
        'Wonderful! Content Marketing is key. What kind of content are you focusing on?',
      trigger: '29',
    },
    {
      id: '29',
      user: true,
      trigger: '30',
    },
    {
      id: '30',
      message:
        "Lastly, would you like to talk to our sales department? Please reply with 'Yes' or 'No'.",
      trigger: '31',
    },
    {
      id: '31',
      options: [
        { value: 'Yes', label: 'Yes', trigger: '32' },
        { value: 'No', label: 'No', trigger: '33' },
      ],
    },
    {
      id: '32',
      message: 'Great choice! Please wait while we connect you to an agent.',
      end: true,
    },
    {
      id: '33',
      message:
        'Thank you for considering our services. If you have any more questions in the future, feel free to reach out. Have a great day!',
      end: true,
    },
  ];

  console.log(`userDetails:`, userDetails);
  useEffect(() => {
    async function fetchUserData() {
      const response = await fetch(`/api/create-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userDetails),
      });

      // Check if the response is ok before trying to parse JSON
      if (response.ok) {
        const data = await response.json();

        // Handle successful response
        toast({
          title: 'We will reach you soon!',
        });
      }
    }

    if (userDetails.desiredService) {
      // If desiredService is truthy, call fetchUserData
      setTimeout(() => {
        fetchUserData();
      }, 1500);
    }
  }, [userDetails.desiredService]);

  return (
    <ThemeProvider theme={theme}>
      <ChatBot
        steps={steps}
        handleEnd={(steps: any, values: any) => handleEnd(steps, values)}
      />
    </ThemeProvider>
  );
};

export default Chatbot;
