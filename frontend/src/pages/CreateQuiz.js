import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { Formik, FieldArray } from 'formik';
import * as Yup from 'yup';
import api from '../services/api';

const CreateQuiz = () => {
  const handleSubmit = async (values, actions) => {
    try {
      const token = localStorage.getItem('token');
      await api.post('/quizzes', values, { headers: { 'x-auth-token': token } });
      alert('Quiz created successfully');
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Create a New Quiz</Typography>
      <Formik
        initialValues={{
          title: '',
          description: '',
          timeLimit: 30,
          questions: [{ questionText: '', correctAnswer: '' }],
        }}
        validationSchema={Yup.object({
          title: Yup.string().required('Required'),
          questions: Yup.array().of(
            Yup.object({
              questionText: Yup.string().required('Required'),
              correctAnswer: Yup.string().required('Required'),
            })
          ),
        })}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Quiz Title"
              name="title"
              value={values.title}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={values.description}
              onChange={handleChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Time Limit (minutes)"
              name="timeLimit"
              value={values.timeLimit}
              onChange={handleChange}
              margin="normal"
            />
            <FieldArray name="questions">
              {({ push, remove }) => (
                <div>
                  {values.questions.map((question, index) => (
                    <div key={index}>
                      <TextField
                        fullWidth
                        label={`Question ${index + 1}`}
                        name={`questions[${index}].questionText`}
                        value={question.questionText}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <TextField
                        fullWidth
                        label="Correct Answer"
                        name={`questions[${index}].correctAnswer`}
                        value={question.correctAnswer}
                        onChange={handleChange}
                        margin="normal"
                      />
                      <Button onClick={() => remove(index)}>Remove Question</Button>
                    </div>
                  ))}
                  <Button onClick={() => push({ questionText: '', correctAnswer: '' })}>
                    Add Question
                  </Button>
                </div>
              )}
            </FieldArray>
            <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
              Create Quiz
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default CreateQuiz;