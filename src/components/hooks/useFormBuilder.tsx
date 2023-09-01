import { useDispatch, useSelector } from 'react-redux';
import {
  ICar,
  IUseAddOrEditProps,
  IUseAddOrEditReturn,
  ValidationErrors,
} from '../interfaces/interfaces';
import { RootState } from '../../store/store';
import { useNavigate } from 'react-router';
import React, { useCallback, useEffect, useState } from 'react';
import { initialFormData } from '../helpers/gridListFields';
import { validateFields } from '../helpers/validate';
import { addCar, editCar } from '../../reducers/carsReducer';
import { carValidationConfig } from '../helpers/validationConfigs';

const useFormBuilder = ({
  addOrEdit,
}: IUseAddOrEditProps): IUseAddOrEditReturn => {
  const dispatch = useDispatch();

  const car = useSelector((state: RootState) => state.cars.selectedCar);

  const navigate = useNavigate();

  const [formData, setFormData] = useState<Partial<ICar>>(initialFormData);

  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {},
  );

  useEffect(() => {
    setFormData(initialFormData);
    if (addOrEdit === 'edit' && car) {
      setFormData(car);
    }
  }, [car, addOrEdit]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();

      const errors = validateFields(formData, carValidationConfig);

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        dispatch(addCar({ ...(formData as ICar) }));
        setFormData({});
        navigate('/');
      }
    },
    [formData, dispatch, navigate],
  );

  const handleEdit = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const errors = validateFields(formData, carValidationConfig);

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
      } else {
        if (car) {
          dispatch(editCar({ id: car.id, updatedCar: formData }));
          setFormData({});
          navigate('/');
        }
      }
    },
    [formData, car, dispatch, navigate],
  );

  const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFormData(initialFormData);
  };

  return {
    handleChange,
    handleClear,
    handleEdit,
    handleSubmit,
    validationErrors,
    formData,
  };
};

export default useFormBuilder;
