# Create model form file

function createDashboardModelFormFile() {
  local modelFormFile=./dashboard/src/app/main/application/$lowerModelNamePlural/form/${modelName}.js
  if [[ -f "$modelFormFile" ]]; then
    while true; do
      read -p "$modelFormFile file already exists do you want to replace it?(yes/no)" yn
      case $yn in
      [Yy]*) break ;;
      [Nn]*) return ;;
      *) echo "Please answer yes or no." ;;
      esac
    done
  fi
  getAttributes
  touch $modelFormFile
  echo "import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import { useTheme } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import FuseAnimate from '../../../../../@fuse/core/FuseAnimate';
import FusePageCarded from '../../../../../@fuse/core/FusePageCarded';
import FuseLoading from '../../../../../@fuse/core/FuseLoading';
import { useForm, useDeepCompareEffect } from '../../../../../@fuse/hooks';
import _ from '../../../../../@lodash';
import withReducer from '../../../../store/withReducer';
import reducer from '../store';
import { save${modelName}, new${modelName}, reset${modelName}, get${modelName} } from '../store/${lowerModelName}Slice';

function ${modelName}(props) {
  const dispatch = useDispatch();
  const { t } = useTranslation('${lowerModelNamePlural}App');
  const ${lowerModelName} = useSelector(({ ${lowerModelName}App }) => ${lowerModelName}App.${lowerModelName});
  const routeParams = useParams();
  const theme = useTheme();

  const [tabValue, setTabValue] = useState(0);
  const [no${modelName}, setNo${modelName}] = useState(false);
  const { form, handleChange, setForm, setInForm } = useForm(null);

  useDeepCompareEffect(() => {
    function update${modelName}State() {
      const { ${lowerModelName}Id } = routeParams;

      if (${lowerModelName}Id === 'new') {
        dispatch(new${modelName}());
      } else {
        dispatch(get${modelName}(routeParams)).then((action) => {
          if (!action.payload) {
            setNo${modelName}(true);
          }
        });
      }
    }

    update${modelName}State();
  }, [dispatch, routeParams]);

  useEffect(() => {
    if ((${lowerModelName} && !form) || (${lowerModelName} && form && ${lowerModelName}._id !== form._id)) {
      setForm(${lowerModelName});
    }
  }, [form, ${lowerModelName}, setForm]);

  useEffect(() => {
    return () => {
      dispatch(reset${modelName}());
      setNo${modelName}(false);
    };
  }, [dispatch]);

  function handleChangeTab(event, mTabValue) {
    setTabValue(mTabValue);
  }

  function canBeSubmitted() {
    // return form.name.length > 0 && !_.isEqual(${lowerModelName}, form);
    return !_.isEqual(${lowerModelName}, form);
  }

  if (no${modelName}) {
    return (
      <FuseAnimate delay={100}>
        <div className=\"flex flex-col flex-1 items-center justify-center h-full\">
          <Typography color=\"textSecondary\" variant=\"h5\">
            {t('THERE_IS_NO_SUCH_${upperModelName}')}
          </Typography>
          <Button
            className=\"mt-24\"
            component={Link}
            variant=\"outlined\"
            to=\"/${lowerModelNamePlural}\"
            color=\"inherit\"
          >
            {t('GO_TO_${upperModelNamePlural}_PAGE')}
          </Button>
        </div>
      </FuseAnimate>
    );
  }

  if ((!${lowerModelName} || (${lowerModelName} && routeParams.${lowerModelName}Id !== ${lowerModelName}._id)) && routeParams.${lowerModelName}Id !== 'new') {
    return <FuseLoading />;
  }

  return (
    <FusePageCarded
      classes={{
        toolbar: 'p-0',
        header: 'min-h-72 h-72 sm:h-136 sm:min-h-136',
      }}
      header={
        form && (
          <div className=\"flex flex-1 w-full items-center justify-between\">
            <div className=\"flex flex-col items-start max-w-full\">
              <FuseAnimate animation=\"transition.slideRightIn\" delay={300}>
                <Typography
                  className=\"flex items-center sm:mb-12\"
                  component={Link}
                  role=\"button\"
                  to=\"/${lowerModelNamePlural}\"
                  color=\"inherit\"
                >

                  <Icon className=\"text-20\">
                    {theme.direction === 'ltr' ? 'arrow_back' : 'arrow_forward'}
                  </Icon>
                  {t('${upperModelNamePlural}')}
                </Typography>
              </FuseAnimate>

              <div className=\"flex items-center max-w-full\">
                <FuseAnimate animation=\"transition.expandIn\" delay={300}>
                  {form.image ? (
                    <img
                      className=\"w-32 sm:w-48 mr-8 sm:mr-16 rounded\"
                      src={form.image}
                      alt={form.name}
                    />
                  ) : (
                    <img
                      className=\"w-32 sm:w-48 mr-8 sm:mr-16 rounded\"
                      src=\"assets/images/ecommerce/product-image-placeholder.png\"
                      alt={form.name}
                    />
                  )}
                </FuseAnimate>
                <div className=\"flex flex-col min-w-0\">
                  <FuseAnimate animation=\"transition.slideLeftIn\" delay={300}>
                    <Typography className=\"text-16 sm:text-20 truncate\">
                      {form._id ? t('EDIT_${upperModelName}') : t('NEW_${upperModelName}')}
                    </Typography>
                  </FuseAnimate>
                  <FuseAnimate animation=\"transition.slideLeftIn\" delay={300}>
                    <Typography variant=\"caption\">{t('${upperModelName}_DETAIL')}</Typography>
                  </FuseAnimate>
                </div>
              </div>
            </div>
            <FuseAnimate animation=\"transition.slideRightIn\" delay={300}>
              <Button
                className=\"whitespace-nowrap normal-case\"
                variant=\"contained\"
                color=\"secondary\"
                disabled={!canBeSubmitted()}
                onClick={() => {
                  dispatch(save${modelName}(form)).then(() => {
                    props.history.push('/${lowerModelNamePlural}');
                  });
                }}
              >
                {t('SAVE')}
              </Button>
            </FuseAnimate>
          </div>
        )
      }
      contentToolbar={(
        <Tabs
          value={tabValue}
          onChange={handleChangeTab}
          indicatorColor=\"primary\"
          textColor=\"primary\"
          variant=\"scrollable\"
          scrollButtons=\"auto\"
          classes={{ root: 'w-full h-64' }}
        >
          <Tab className=\"h-64\" label={t('BASIC_INFO')} />
        </Tabs>
      )}
      content={
        form && (
          <div className=\"p-16 sm:p-24\">
            {tabValue === 0 && (
              <div>${cleanAttributes}
              </div>
            )}
          </div>
        )
      }
      innerScroll
    />
  );
}

export default withReducer('${lowerModelName}App', reducer)(${modelName});" >$modelFormFile
}

function getAttributes() {
  cleanAttributes=""
  for value in ${attributes[@]}; do
    cleanAttributes+="
                <TextField
                  className=\"mt-8 mb-16\"
                  label={t('$(tr '[:lower:]' '[:upper:]' <<<${value})')}
                  id=\"${value}\"
                  name=\"${value}\"
                  value={form.${value}}
                  onChange={handleChange}
                  variant=\"outlined\"
                  fullWidth
                />"
  done
}
