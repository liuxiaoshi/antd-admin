import React from 'react'
import {
    Link
} from 'react-router';
import {
    code
} from '../../../../data/code.js'
export const role = {
    name: 'role',
    title: '',
    queryTitle: '搜索编号 / 名称',
    url: '/api/v2/role',
    columns: [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        hidden: true,
        width: 10,
        render(text) {
            return <a href="#">{text}</a>
        }
    }, {
        title: '角色编号',
        dataIndex: 'roleNo',
        key: 'roleNo',
        fieldProps: {
            rules: [{
                required: true,
                message: '必填'
            }]
        },
        sorter: (a, b) => a.roleNo.length - b.roleNo.length
    }, {
        title: '角色名称',
        dataIndex: 'roleName',
        key: 'roleName',
        fieldProps: {
            rules: [{
                required: true,
                message: '必填'
            }]
        },
        sorter: (a, b) => a.roleName.length - b.roleName.length
    }, {
        title: '角色描述',
        dataIndex: 'description',
        key: 'description',
        type: 'textarea',
        hidden: true
    }, {
        title: '是否启用',
        dataIndex: 'isEnable',
        key: 'isEnable',
        width: 100,
        type: 'select',
        selectOptions: code.isEnable,
        fieldProps: {
            initialValue: '0'
        },
        render(text, record) {
            let item = code.isEnable.find(item => item.key == text)
            return (<p>{item?item.value:''}</p>)
        }
    }, {
        title: '操作',
        key: 'operation',
        width: 80,
        render(text, record) {
            return (
                <span>
                <Link to={'/system/role/' + record.id}>详情</Link>
            </span>
            )
        }
    }]
}

const userExists = function(rule, value, callback) {
    if (!value) {
        callback();
    } else {
        setTimeout(() => {
            if (value === 'JasonWood') {
                callback([new Error('抱歉，该用户名已被占用。')]);
            } else {
                callback();
            }
        }, 800);
    }
}