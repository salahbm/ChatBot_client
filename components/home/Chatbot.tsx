'use client';
import React, { useEffect, useState } from 'react';
import ChatBot from 'react-simple-chatbot';
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
  const [steps, setSteps] = useState([]);
  console.log(`steps:`, steps);
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

  // get user response from chatbot
  function handleEnd(steps: any) {
    setUserDetails((prevUserDetails) => ({
      ...prevUserDetails,
      name: steps?.values[0],
      email: steps?.values[1],
      phone: steps?.values[2],
      marketingRequirement: steps?.values[3],
      desiredService: steps?.values[4],
      salesDepAgreement: steps?.values[5],
    }));
  }

  //  pass the validation
  const constructSteps = (data: any) => {
    return data.map((item: any) => {
      if (item.validator) {
        const validatorMap: Record<string, (value: string) => any> = {
          '3': isValidName,
          '5': isValidEmail,
          '7': isValidPhone,
        };

        if (item.id in validatorMap) {
          item.validator = validatorMap[item.id];
        }
      }

      return item;
    });
  };

  // remove empty steps

  const removeFalseOrNullValues = (data: any) => {
    return data.map((item: boolean) => {
      // Use Object.entries to filter out properties with values of false or null
      const filteredItem = Object.fromEntries(
        Object.entries(item).filter(
          ([key, value]) => value !== false && value !== null
        )
      );

      return filteredItem;
    });
  };

  // get  steps from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data from your own API route
        const response = await fetch('/api/chatbot-steps');
        const result = await response.json();
        const filteredResult = await constructSteps(result.data);
        const removedUndefinedValues = await removeFalseOrNullValues(
          filteredResult
        );
        setSteps(removedUndefinedValues);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // store user response
  useEffect(() => {
    console.log(`userDetails:`, userDetails);
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
        // Handle successful response
        toast({
          title: 'We will reach you soon!',
        });
      }
    }

    if (userDetails.salesDepAgreement) {
      // If desiredService is truthy, call fetchUserData

      fetchUserData();
    }
  }, [userDetails.salesDepAgreement]);
  return (
    <>
      {steps.length != 0 && (
        <ThemeProvider theme={theme}>
          <ChatBot
            steps={steps}
            handleEnd={(steps: string[]) => handleEnd(steps)}
          />
        </ThemeProvider>
      )}
    </>
  );
};

export default Chatbot;
