import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import {createBrand, updateBrand, deleteBrand, getBrands} from '../../redux/actions/brandActions';
import BrandsTable from '../brands/BrandsTable';
import EditBrand from '../brands/EditBrand';
import CreateBrand from '../brands/CreateBrand';

class BrandsPage extends Component {

    constructor(props) {
        super(props);
        this.state = {edit: false, create: false, brand: undefined}
    };

    componentDidMount() {
        this.props.getBrands();
    };

    render() {

        const { brands, brand, loading } = this.props.data;

        const editBrand = (brand) => {
            console.log('edit brand');
            this.setState({edit: true, create: false, brand: brand}); 
        };

        const createBrand = () => {
            this.setState({edit: false, create: true, brnad: undefined});
        };
        
        const closeModal = () => {
            this.setState({edit: false, create: false, brand: undefined}); 
        };
        
        const updateBrand = (newBrand) => {
            this.props.updateBrand( newBrand.id, newBrand);
        }

        const saveBrand = (newBrand) => {
            this.props.createBrand(newBrand);
        }

        const deleteBrand = (id) => {
            this.props.deleteBrand(id);
        }

        return (
            <Fragment>
                <Grid container spacing={3}>
                    <Grid item sm={12} xs={3}>
                        {
                            !loading && brands !== null ?
                            (
                                <BrandsTable
                                    items={brands}
                                    onClose={closeModal}
                                    onSelectItem={editBrand}
                                    onCreateItem={createBrand} />
                            ) :
                            (
                                <CircularProgress />
                            )
                        }
                    </Grid>
                </Grid>

                {!loading && brand !== undefined ? 
                (
                    <div>
                        <EditBrand
                            brand={this.state.brand ?? brand}
                            open={this.state.edit}
                            onClose={closeModal}
                            onSave={updateBrand}
                            onDelete={deleteBrand}
                            loading={loading}  />

                        <CreateBrand
                            open={this.state.create}
                            onClose={closeModal}
                            onSave={saveBrand} />

                    </div>
                ) :
                (
                    <></>
                )}
            </Fragment>
        )
    }
}

BrandsPage.propTypes = {
    getBrands: PropTypes.func.isRequired,
    createBrand: PropTypes.func.isRequired,
    updateBrand: PropTypes.func.isRequired,
    deleteBrand: PropTypes.func.isRequired,
    brands: PropTypes.array
}

const mapStateToProps = (state) => ({
    data: state.data
})

const mapDispatchToProps = {
    getBrands,
    createBrand,
    updateBrand,
    deleteBrand
}

export default connect(mapStateToProps, mapDispatchToProps)(BrandsPage);
