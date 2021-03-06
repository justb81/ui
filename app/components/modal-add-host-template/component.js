import Ember from 'ember';
import ModalBase from 'ui/mixins/modal-base';
import NewOrEdit from 'ui/mixins/new-or-edit';

export default Ember.Component.extend(ModalBase, NewOrEdit, {
  classNames:           ['medium-modal'],
  store:                Ember.inject.service(),
  cloudPlans:           Ember.inject.service(),
  provider:             Ember.computed.alias('modalOpts.provider'),
  selectedHostTemplate: null,
  primaryResource:      Ember.computed.alias('selectedHostTemplate'),
  hostDetails:          Ember.computed.alias('cloudPlans.hostDetails'),
  init() {
    this._super(...arguments);
    this.set('selectedHostTemplate', Ember.$.extend(this.get('store').createRecord({type: 'hostTemplate'}), this.get('hostDetails').findBy('flavorPrefix', this.get('provider'))));
  },
  doneSaving(neu) {
    this.get('modalOpts.hostKeys.content').pushObject(neu);
    this.send('cancel');
  }
});
