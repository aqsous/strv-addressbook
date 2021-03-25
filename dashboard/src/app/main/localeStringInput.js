import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import * as otherAction from '../services/otherService';

function LocaleStringInput(props) {
  const {
    name,
    label,
    value: oldValue,
    onValueChange,
    textFieldProps,
  } = props;
  const [value, setValue] = React.useState(oldValue);

  useEffect(() => {
    setValue(props.value);
  }, [props, props.value]);

  function handleLocaleValueChange(event, locale) {
    const newValue = {
      ...value,
    };
    newValue[locale] = event.target.value;
    setValue(newValue);
    onValueChange(newValue, name);
  }

  const handleGetAllTranslation = (event, lang) => {
    event.preventDefault();
    otherAction.translate(value.en, lang)
      .then((translateResponse) => {
        const newValue = {
          ...value,
        };
        newValue[lang] = translateResponse.data.value;
        setValue(newValue);
        onValueChange(newValue, name);
      });
  };

  return (
    <>
      <TextField
        className="mt-8 mb-16"
        label={`${label} En`}
        id={`${name}En`}
        name={`${name}En`}
        value={value.en}
        onChange={(event) => handleLocaleValueChange(event, 'en')}
        variant="outlined"
        {...textFieldProps}
      />

      <TextField
        className="mt-8 mb-16"
        label={`${label} Fr`}
        id={`${name}Fr`}
        name={`${name}Fr`}
        value={value.fr}
        onChange={(event) => handleLocaleValueChange(event, 'ar')}
        variant="outlined"
        InputProps={{
          endAdornment: (<InputAdornment position="end">
            <Button
              onMouseDown={(event) => handleGetAllTranslation(event, 'fr')}
            >
              <Icon>translate</Icon>
            </Button>
          </InputAdornment>),
        }}
        {...textFieldProps}
      />
    </>
  );
}

export default React.memo(LocaleStringInput);

LocaleStringInput.defaultProps = {
  name: 'name',
  label: 'Name',
  value: undefined,
  textFieldProps: {},
};

LocaleStringInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  onValueChange: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  value: PropTypes.object,
  textFieldProps: PropTypes.object,
};
