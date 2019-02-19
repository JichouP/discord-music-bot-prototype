import React, { Component } from 'react';
import { withStyles, Theme } from '@material-ui/core/styles';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

class Selector extends Component<
  { classes?: any; onChangeHandle: (arg: any) => void; items: [string, string][]; initialValue: string },
  { value: string }
> {
  constructor(props: any) {
    super(props);
    this.state = { value: this.props.initialValue || '' };
  }

  render() {
    const { classes } = this.props;
    return (
      <form className={classes.root} autoComplete='off'>
        <FormControl variant='outlined' className={classes.formControl} style={{ borderRadius: 5 }}>
          <InputLabel htmlFor='outlined-age-simple' />
          <Select
            value={this.state.value}
            onChange={e => {
              this.props.onChangeHandle(e.target.value);
              this.setState({ ...this.state, value: e.target.value });
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
