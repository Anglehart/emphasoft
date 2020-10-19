import React from 'react';
import 'antd/dist/antd.css';
import './usersTable.css';
import { Table, Input, Button, Space, Tag } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';

const UsersTable = (props) => {
  const [searchText, setSearchText] = React.useState('');
  const [searchedColumn, setSearchedColumn] = React.useState('');
  let searchInput = '';

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
})

const handleSearch = (selectedKeys, confirm, dataIndex) => {
  confirm();
  setSearchText(selectedKeys[0]);
  setSearchedColumn(dataIndex);
};

const handleReset = clearFilters => {
  clearFilters();
  setSearchText('');
};

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => Number.parseInt(a.id) - Number.parseInt(b.id),
  },
  {
    title: 'Name',
    dataIndex: 'username',
    ...getColumnSearchProps('username'),
  },
  {
    title: 'First Name',
    dataIndex: 'first_name',
  },
  {
    title: 'Last Name',
    dataIndex: 'last_name',
  },
  {
    title: 'Active?',
    dataIndex: 'is_active',
    render: is_active => {
            let color = '';
            let word = '';
            if (is_active) {
              color = 'green';
              word = 'Yes'
            } else {
              color = 'red';
              word = 'No'
            }
            return (<Tag color={color} key={is_active}>{word}</Tag>);
          },
  },
  {
    title: 'Superuser?',
    dataIndex: 'is_superuser',
    render: is_superuser => {
            let color = '';
            let word = '';
            if (is_superuser) {
              color = 'green';
              word = 'Yes'
            } else {
              color = 'red';
              word = 'No'
            }
            return (<Tag color={color} key={is_superuser}>{word}</Tag>);
          },
  },
  {
    title: 'Last Login',
    dataIndex: 'last_login',
    className: 'last_login_col',
    render: last_login => {
      const d = new Date(last_login);
      return last_login && d.toDateString();
    }
  }
];

return(
  <div className="table-wrapper">
    <Button onClick={props.onLogOut}>Log Out</Button>
    <Table columns={columns} dataSource={props.users} rowKey="id" />
  </div>
)
}

export default UsersTable;
