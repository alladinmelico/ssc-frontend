import React, { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import Page from 'material-ui-shell/lib/containers/Page';
import { GridActionsCellItem } from '@mui/x-data-grid';
import DataTable from '../../components/DataTable';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import SectionForm from './SectionForm'
import { useDispatch, useSelector } from "react-redux"
import Stack from '@mui/material/Stack';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useQuestions } from 'material-ui-shell/lib/providers/Dialogs/Question'
import { useSnackbar } from 'notistack'
import {
  getAdminSections,
  deleteSection,
  clearErrors,
} from "../../actions/sectionActions"
import { DELETE_SECTION_RESET } from "../../constants/sectionConstants"
import SectionShow from './SectionShow';

const Section = ({history}) => {
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [section, setSection] = useState({})
  const [editMode, setEditMode] = useState(true)
  const intl = useIntl();
  const dispatch = useDispatch()
  const { openDialog, setProcessing } = useQuestions()
  const { enqueueSnackbar } = useSnackbar()

  const { loading, sections, count, error } = useSelector((state) => state.sections)
  const { error: deleteError, isDeleted } = useSelector((state) => state.section)

  useEffect(() => {
    dispatch(getAdminSections(page, rowsPerPage))
    if (error === 'Unauthenticated.') {
      console.log(history)
      history.push('/signin')
    }

    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      dispatch({ type: DELETE_SECTION_RESET })
      dispatch(getAdminSections(page, rowsPerPage))
      enqueueSnackbar('Section successfully Deleted.', {
        variant: 'success',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      })
    }
  }, [dispatch, deleteError, isDeleted, page, rowsPerPage, error])

  const columns = [
    { field: 'id', headerName: 'ID', width: 100, type: 'number'},
    { field: 'name', headerName: 'Name', flex: 0.3 , minWidth: 150 },
    { field: 'president_name', headerName: 'President', flex: 0.3 , minWidth: 300 },
    { field: 'faculty_name', headerName: 'Faculty', flex: 0.3 , minWidth: 300 },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      disableExport: true,
      getActions: (params) => [
        <GridActionsCellItem icon={<VisibilityOutlinedIcon color="green" />} onClick={() => {
          setSection(params.row)
          setEditMode(false)
        }} label="View" />,
        <GridActionsCellItem icon={<EditOutlinedIcon color="primary" />} onClick={() => {
          setSection(params.row)
          setEditMode(true)
        }} label="Edit" />,
        <GridActionsCellItem icon={<DeleteOutlinedIcon color="secondary" />} onClick={() => 
          openDialog({
            title: intl.formatMessage({
              id: 'dialog_title',
              defaultMessage: 'Dialog Item',
            }),
            message: intl.formatMessage({
              id: 'dialog_message',
              defaultMessage:
                'Are you sure you want to delete this item?',
            }),
            action: intl.formatMessage({
              id: 'dialog_action',
              defaultMessage: 'YES, Delete',
            }),
            handleAction: (handleClose) => {
              dispatch(deleteSection(params.id))
              handleClose()
            },
          })
        } label="Delete" />,
      ]
    },
  ];

  return (
    <Page
      pageTitle={intl.formatMessage({ id: 'section', defaultMessage: 'Section' })}
    >
      <DataTable
        rows={sections}
        columns={columns}
        count={count}
        loading={loading}
        page={page}
        setPage={setPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />
      <Box>
        {editMode ? (
          <SectionForm section={section} modalClosed={() => setSection({})} page={page} rowsPerPage={rowsPerPage} />
        ) : (
          <SectionShow section={section} modalClosed={() => {
            setSection({})
            setEditMode(true)
          }} />
        )}
      </Box>
    </Page>
  );
};
export default Section;
