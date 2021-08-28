import React from 'react';
import { Switch , Route} from 'react-router-dom';

import { Dashboard } from '../pages/Dasboard';
import { Repository } from '../pages/Repository';

export const Routes: React.FC = () => (
    // Switch - garante que somente uma rota se escolhida
    <Switch> 
        {/* exact - para que somente quantiver / */}
        <Route path="/" exact component={Dashboard} /> 
        <Route path="/repository/:repository+" component={Repository} />
    </Switch>
)