import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { observer } from 'mobx-react';

@observer
class Selector extends Component<{
  classes?: any;
  onChangeHandle: (arg: any) => void;
  items: [string, string][];
  initialValue: string;
}> {
  constructor(props: any) {
    super(props);
    setTimeout(() => {
      console.log(this.props.initialValue);
    }, 1);
  }

  render() {
    const { classes } = this.props;
    return (
      <form autoComplete='off'>
        <FormControl variant='outlined' className={classes.formControl} style={{ borderRadius: 5 }}>
          <InputLabel htmlFor='outlined-age-simple' />
          <Select
            value={this.props.initialValue}
            onChange={e => {
              this.props.onChangeHandle(e.target.value);
            }}
            input={
              <OutlinedInput
                labelWidth={0}
                name='guilds'
                id='outlined-age-simple'
                style={{ transform: 'rotate(0.05deg)' }}
              />
            }>
            {this.props.items.map(v => (
              <MenuItem key={v[0]} value={v[0]} style={{ transform: 'rotate(0.05deg)' }}>
                {v[1]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </form>
    );
  }
}

const styles = (theme: Theme) => ({
  formControl: {
    backgroundColor: '#aaa',
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});
export default withStyles(styles)(Selector);
