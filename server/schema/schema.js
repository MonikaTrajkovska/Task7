const graphql = require('graphql')
const Project = require('../models/project')
const Author = require('../models/author')

const { GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,


} = graphql;
// var GraphQLTime = require('graphql-date');
const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    description: { type: GraphQLString },
    hours: { type: GraphQLString },


    author: {
      type: AuthorType,
      resolve(parent, args) {
        return Author.findById(parent.authorId)

      }
    }
  })
})
const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({ authorId: parent.id })

      }
    }

  })
})
const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    project: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findById(args.id)

      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Author.findById(args.id)

      }
    },
    projects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({})

      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return Author.find({})

      }
    }

  }
})
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
        // authorId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age
        });
        return author.save()

      }
    },
    addProject: {
      type: ProjectType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        hours: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },

      },
      resolve(parent, args) {
        let project = new Project({
          name: args.name,
          description: args.description,
          hours: args.hours,
          authorId: args.authorId,

        })
        return project.save()
      }
    },

    removeProject: {
      type: ProjectType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        const remProject = Project.findByIdAndRemove(args.id).exec();
        if (!remProject) {
          throw new Error('Error')
        }
        return remProject;
      }
    },
    updateProject: {
      type: ProjectType,
      args: {
        id: {

          type: new GraphQLNonNull(GraphQLString)
        },

        name: {
          type: new GraphQLNonNull(GraphQLString)
        },
        description: {
          type: new GraphQLNonNull(GraphQLString)
        },

        hours: {
          type: new GraphQLNonNull(GraphQLString)
        }

      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(args.id, { name: args.name, description: args.description, hours: args.hours, }, function (err) {
          if (err) return next(err);
        });
      }
    },
    removeHours: {
      type: ProjectType,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        hours: {
          type: new GraphQLNonNull(GraphQLString)
        }
      },
      resolve(parent, args) {
        const rem = Project.findByIdAndUpdate(args.id, { hours: args.hours }).exec();
        if (!rem) {
          throw new Error('Error')
        }
        return rem;
      }
    },



  }


})

module.exports = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
})