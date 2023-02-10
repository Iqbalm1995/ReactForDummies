import React, { useState } from "react";
import {
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Card,
  CardBody,
  CardHeader,
  Container,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useFormik,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import { Link, Outlet } from "react-router-dom";

interface IDataBinding {
  id: string;
  username: string;
  fullName: string;
  password: string;
}

interface IPropTypes {
  editMode: boolean;
  dataBinding: IDataBinding;
}

const FormSchema = Yup.object().shape({
  username: Yup.string().required("Required"),
  fullName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords tidak sama")
    .required("Required"),
});

let CurrentEditMode = false;

export const FormUsers = ({ editMode, dataBinding }: IPropTypes) => {
  CurrentEditMode = editMode;

  const [isDisableInput, setDisable] = React.useState(editMode);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  const handleDisableClick = () => setDisable(!isDisableInput);

  const formik = useFormik({
    initialValues: {
      username: dataBinding.username,
      fullName: dataBinding.fullName,
      password: dataBinding.password,
      passwordConfirm: "",
    },
    validationSchema: FormSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      console.log(values);
      alert("Aaowkoawkoaw");
    },
  });

  return (
    <Card m="3">
      <CardHeader>
        <Heading size="md">Users Form</Heading>
      </CardHeader>
      <CardBody>
        <form onSubmit={formik.handleSubmit}>
          <Container maxW="4xl" mb="50px">
            <FormControl
              mr="5%"
              isInvalid={formik.errors.username ? true : false}
              isRequired
            >
              <FormLabel htmlFor="username" fontWeight={"normal"}>
                Username
              </FormLabel>
              <Input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
                placeholder="Username"
                disabled={isDisableInput}
              />
              <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt="2%"
              isInvalid={formik.errors.fullName ? true : false}
              isRequired
            >
              <FormLabel htmlFor="fullName" fontWeight={"normal"}>
                Full Name
              </FormLabel>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.fullName}
                placeholder="Full Name"
                disabled={isDisableInput}
              />
              <FormErrorMessage>{formik.errors.fullName}</FormErrorMessage>
            </FormControl>

            <FormControl
              mt="2%"
              isInvalid={formik.errors.password ? true : false}
              isRequired
            >
              <FormLabel htmlFor="password" fontWeight={"normal"}>
                Password
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                  disabled={isDisableInput}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <FormControl
              mt="2%"
              isInvalid={formik.errors.passwordConfirm ? true : false}
              isRequired
            >
              <FormLabel htmlFor="passwordConfirm" fontWeight={"normal"}>
                Password Confirmation
              </FormLabel>
              <InputGroup size="md">
                <Input
                  id="passwordConfirm"
                  name="passwordConfirm"
                  onChange={formik.handleChange}
                  value={formik.values.passwordConfirm}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password Confirmation"
                  disabled={isDisableInput}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>
                {formik.errors.passwordConfirm}
              </FormErrorMessage>
            </FormControl>
          </Container>
          <Flex
            minWidth="max-content"
            justifyContent="flex-end"
            gap="2"
            mt="5%"
          >
            <ButtonGroup gap="2">
              <Link to={`/`}>
                <Button
                  leftIcon={<CloseIcon />}
                  colorScheme="red"
                  size="lg"
                  variant="outline"
                >
                  Cancel
                </Button>
              </Link>
              {CurrentEditMode && (
                <Button
                  leftIcon={<EditIcon />}
                  colorScheme="blue"
                  size="lg"
                  variant="outline"
                  onClick={handleDisableClick}
                >
                  Edit Mode
                </Button>
              )}
              <Button
                leftIcon={<CheckIcon />}
                colorScheme="teal"
                size="lg"
                type="submit"
              >
                Save
              </Button>
            </ButtonGroup>
          </Flex>
        </form>
      </CardBody>
    </Card>
  );
};
