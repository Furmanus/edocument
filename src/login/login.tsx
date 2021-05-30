import * as React from 'react';
import { render } from 'react-dom';
import { LoginContainer } from './components/LoginContainer';
import '../common/utils/sentry';

render(<LoginContainer />, document.getElementById('app'));
