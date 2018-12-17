import $ from "jquery";





const getters = {
    getAll(state) {
        return state.all;
    },
    getItemById: (state) => (id) => {
        return state.all.find(item => item._id === id);
    },
    getItemByProperty: (state) => (property, value) => {
        return state.all.find(item => item[property] === value);
    }
};

const actions = {
    create(context, item, route) {
        return new Promise((resolve, reject) => {
            $.ajax({
                'url': (config.backend + route),
                'type': 'POST',
                'data': JSON.stringify(item),
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).done(function(response){
                context.commit('create', response);
                resolve(response);
            });
        })
    },
    update(context, item, route) {
        return new Promise((resolve, reject) => {
            $.ajax({
                'url': (config.backend + route + '/' + item._id),
                'type': 'PUT',
                'data': JSON.stringify(item),
                'headers': {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).done(function (response) {
                context.commit('update', response);
                resolve();
            });
        })
    },
    delete(context, item, route) {
        return new Promise((resolve, reject) => {
            $.ajax({
                'url': (config.backend + route + '/' + item._id),
                'type': 'DELETE',
                'headers': {
                    'Accept': 'application/json'
                }
            }).done(function (response) {
                context.commit('delete', item);
                resolve();
            });
        })
    }
};

const mutations = {
    init(state, set, Model) {
        state.all = [];
        for (let item of set) {
            state.all.push(new Model(item));
        }
    },
    setCurrent(state, item) {
        state.current = item;
    },
    unsetCurrent(state) {
        state.current = null;
    },
    create(state, item, Model) {
        state.all.push(new Model(item));
    },
    update(state, item, Model) {
        let newState = [];
        for (let thisItem of state.all) {
            if (thisItem._id === item._id) {
                // the cloning is need otherwise we could be editing directly the state
                newState.push(new Model({...item}));
            } else {
                newState.push(thisItem);
            }
        }
        state.all = newState;
    },
    delete(state, item) {
        state.all = state.all.filter(function(thisItem){
            return thisItem._id !== item._id;
        });
    }
};

export default {
    getters,
    actions,
    mutations
}
